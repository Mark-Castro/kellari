import type { StrapiInsight } from './strapi';

export type InsightContentBlock =
  | { type: 'heading'; level: number; text: string; id: string }
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | {
      type: 'framework';
      items: Array<{ number: string; title: string; description: string }>;
    };

type InsightContentBlockDraft =
  | { type: 'heading'; level: number; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | {
      type: 'framework';
      items: Array<{ number: string; title: string; description: string }>;
    };

function isParagraphBlock(
  block: InsightContentBlockDraft | undefined,
): block is Extract<InsightContentBlockDraft, { type: 'paragraph' }> {
  return block?.type === 'paragraph';
}

function getText(value: unknown): string {
  if (Array.isArray(value)) return value.map(getText).join('');
  if (!value || typeof value !== 'object') return '';

  const record = value as Record<string, unknown>;
  if (typeof record.text === 'string') return record.text;
  return getText(record.children);
}

export function getInsightExcerpt(
  insight: Pick<StrapiInsight, 'content' | 'body' | 'excerpt'>,
  maxLength = 220,
): string | undefined {
  const savedExcerpt = insight.excerpt?.trim();
  if (
    savedExcerpt &&
    !/^(?:executive\s+)?(?:summary|overview|introduction)$/i.test(savedExcerpt)
  ) {
    return savedExcerpt;
  }

  const firstBodyParagraph = insight.body
    ?.split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line && !/^(?:#{1,6}\s|>|(?:\d+\.|[-*])\s)/.test(line));
  const firstContentParagraph = insight.content?.find((value) => {
    if (!value || typeof value !== 'object') return false;
    const block = value as Record<string, unknown>;
    const text = getText(block.children).trim();
    return (
      block.type === 'paragraph' &&
      text &&
      !/^(?:executive\s+)?(?:summary|overview|introduction)$/i.test(text)
    );
  });
  const source =
    firstContentParagraph && typeof firstContentParagraph === 'object'
      ? getText((firstContentParagraph as Record<string, unknown>).children)
      : firstBodyParagraph ?? insight.content?.map(getText).join(' ');
  const text = source
    ?.replace(/[`*_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!text) return undefined;
  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength - 1);
  const lastSpace = truncated.lastIndexOf(' ');
  return `${truncated.slice(0, lastSpace > 0 ? lastSpace : maxLength - 1).trimEnd()}…`;
}

function isEditorialHeading(text: string): boolean {
  const normalized = text.trim();
  const words = normalized.split(/\s+/);
  if (
    !normalized ||
    normalized.length > 110 ||
    words.length > 12 ||
    /[.!?:;]$/.test(normalized) ||
    !/^[A-Z0-9]/.test(normalized)
  ) {
    return false;
  }

  return words.every(
    (word, index) =>
      index === 0 ||
      /^(?:&|of|and|for|to|in|the|with|on|a|an|from|by)$/i.test(word) ||
      /^[A-Z0-9]/.test(word),
  );
}

function isSectionLabel(text: string): boolean {
  return /^(?:executive\s+)?(?:summary|overview|introduction)$/i.test(text.trim());
}

function getFrameworkItem(
  blocks: InsightContentBlockDraft[],
  index: number,
):
  | {
      item: { number: string; title: string; description: string };
      nextIndex: number;
    }
  | undefined {
  const numberBlock = blocks[index];
  const titleBlock = blocks[index + 1];
  const descriptionBlock = blocks[index + 2];
  if (
    isParagraphBlock(numberBlock) &&
    isParagraphBlock(titleBlock) &&
    /^(\d{1,2})[.)]\s+(.+)$/.test(numberBlock.text.trim())
  ) {
    const numberedTitle = /^(\d{1,2})[.)]\s+(.+)$/.exec(numberBlock.text.trim());
    if (numberedTitle && isEditorialHeading(numberedTitle[2])) {
      return {
        item: {
          number: numberedTitle[1].padStart(2, '0'),
          title: numberedTitle[2],
          description: titleBlock.text,
        },
        nextIndex: index + 2,
      };
    }
  }

  if (
    !isParagraphBlock(numberBlock) ||
    !/^\d{1,2}$/.test(numberBlock.text.trim()) ||
    !isParagraphBlock(titleBlock) ||
    !isEditorialHeading(titleBlock.text) ||
    !isParagraphBlock(descriptionBlock)
  ) {
    return undefined;
  }

  return {
    item: {
      number: numberBlock.text.trim().padStart(2, '0'),
      title: titleBlock.text,
      description: descriptionBlock.text,
    },
    nextIndex: index + 3,
  };
}

function promoteEditorialContent(
  blocks: InsightContentBlockDraft[],
): InsightContentBlockDraft[] {
  const result: InsightContentBlockDraft[] = [];

  for (let index = 0; index < blocks.length; ) {
    const current = blocks[index];

    if (current.type === 'paragraph' && isSectionLabel(current.text)) {
      index += 1;
      continue;
    }

    const firstFrameworkItem = getFrameworkItem(blocks, index);
    if (firstFrameworkItem) {
      const items: Array<{
        number: string;
        title: string;
        description: string;
      }> = [];
      let nextIndex = index;
      let frameworkItem: ReturnType<typeof getFrameworkItem>;
      while ((frameworkItem = getFrameworkItem(blocks, nextIndex))) {
        items.push(frameworkItem.item);
        nextIndex = frameworkItem.nextIndex;
      }
      result.push({ type: 'framework', items });
      index = nextIndex;
      continue;
    }

    if (current.type === 'paragraph' && isEditorialHeading(current.text)) {
      result.push({
        type: 'heading',
        level: current.text.trim().split(/\s+/).length > 4 ? 2 : 3,
        text: current.text,
      });
    } else {
      result.push(current);
    }
    index += 1;
  }

  return result;
}

function getMarkdownBlocks(markdown: string): InsightContentBlockDraft[] {
  const blocks: InsightContentBlockDraft[] = [];
  let paragraph: string[] = [];

  const flushParagraph = () => {
    const text = paragraph.join(' ').trim();
    if (text) blocks.push({ type: 'paragraph', text });
    paragraph = [];
  };

  for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      continue;
    }

    const heading = /^(#{1,6})\s+(.+)$/.exec(line);
    if (heading) {
      flushParagraph();
      blocks.push({
        type: 'heading',
        level: heading[1].length,
        text: heading[2].replace(/\s+#+$/, '').trim(),
      });
      continue;
    }

    if (line.startsWith('>')) {
      flushParagraph();
      blocks.push({ type: 'quote', text: line.replace(/^>\s?/, '') });
      continue;
    }

    const listItem = /^(?:(\d+)\.|[-*])\s+(.+)$/.exec(line);
    if (listItem) {
      flushParagraph();
      const ordered = Boolean(listItem[1]);
      const previous = blocks.at(-1);
      if (previous?.type === 'list' && previous.ordered === ordered) {
        previous.items.push(listItem[2]);
      } else {
        blocks.push({ type: 'list', ordered, items: [listItem[2]] });
      }
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  return blocks;
}

export function getInsightContentBlocks(
  insight: Pick<StrapiInsight, 'content' | 'body'>,
): InsightContentBlock[] {
  const blocks: InsightContentBlockDraft[] = [];

  if (insight.content?.length) {
    for (const value of insight.content) {
      if (!value || typeof value !== 'object') continue;
      const block = value as Record<string, unknown>;
      const type = typeof block.type === 'string' ? block.type : 'paragraph';

      if (type === 'heading') {
        const text = getText(block.children).trim();
        if (text) {
          blocks.push({
            type: 'heading',
            level: typeof block.level === 'number' ? block.level : 2,
            text,
          });
        }
      } else if (type === 'list') {
        const children = Array.isArray(block.children) ? block.children : [];
        const items = children
          .map((item) => getText(item).trim())
          .filter(Boolean);
        if (items.length) {
          blocks.push({
            type: 'list',
            ordered: block.format === 'ordered',
            items,
          });
        }
      } else {
        const text = getText(block.children).trim();
        if (text) {
          blocks.push({
            type: type === 'quote' ? 'quote' : 'paragraph',
            text,
          });
        }
      }
    }
  } else if (insight.body?.trim()) {
    blocks.push(...getMarkdownBlocks(insight.body));
  }

  const usedIds = new Set<string>();
  return promoteEditorialContent(blocks).map((block) => {
    if (block.type !== 'heading') return block;

    const baseId =
      block.text
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-') || 'section';
    let id = baseId;
    let suffix = 2;
    while (usedIds.has(id)) {
      id = `${baseId}-${suffix}`;
      suffix += 1;
    }
    usedIds.add(id);
    return { ...block, id };
  });
}

export function getInsightReadTime(insight: StrapiInsight): number {
  if (typeof insight.readingTime === 'number' && insight.readingTime > 0) {
    return insight.readingTime;
  }

  const text = [
    insight.title,
    insight.excerpt,
    insight.body,
    ...(insight.content ?? []).map(getText),
  ]
    .filter(Boolean)
    .join(' ');
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 220));
}

export function formatInsightDate(value?: string | null): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeZone: 'UTC',
  }).format(date);
}
