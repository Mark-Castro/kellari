import type { ReactNode } from 'react';
import type {
  StrapiCareer,
  StrapiCareerBlock,
  StrapiCareerInline,
  StrapiCareerListBlock,
} from '../../lib/strapi';

function renderCareerInline(node: StrapiCareerInline, key: string): ReactNode {
  if (node.type === 'link') {
    const children = node.children.map((child, index) =>
      renderCareerInline(child, `${key}-${index}`),
    );
    const isSafeUrl =
      node.url.startsWith('/') ||
      node.url.startsWith('https://') ||
      node.url.startsWith('http://') ||
      node.url.startsWith('mailto:');

    return isSafeUrl ? (
      <a key={key} href={node.url}>
        {children}
      </a>
    ) : (
      <span key={key}>{children}</span>
    );
  }

  let content: ReactNode = node.text;
  if (node.code) content = <code>{content}</code>;
  if (node.strikethrough) content = <s>{content}</s>;
  if (node.underline) content = <u>{content}</u>;
  if (node.italic) content = <em>{content}</em>;
  if (node.bold) content = <strong>{content}</strong>;

  return <span key={key}>{content}</span>;
}

function renderCareerList(block: StrapiCareerListBlock, key: string): ReactNode {
  const List = block.format === 'ordered' ? 'ol' : 'ul';

  return (
    <List key={key}>
      {block.children.map((child, index) =>
        child.type === 'list' ? (
          <li key={`${key}-${index}`}>
            {renderCareerList(child, `${key}-${index}`)}
          </li>
        ) : (
          <li key={`${key}-${index}`}>
            {child.children.map((inline, inlineIndex) =>
              renderCareerInline(inline, `${key}-${index}-${inlineIndex}`),
            )}
          </li>
        ),
      )}
    </List>
  );
}

function renderCareerBlock(block: StrapiCareerBlock, index: number): ReactNode {
  const key = `career-content-${index}`;
  if (block.type === 'list') return renderCareerList(block, key);

  const children = block.children.map((child, childIndex) =>
    renderCareerInline(child, `${key}-${childIndex}`),
  );

  if (block.type === 'heading') {
    switch (block.level) {
      case 1:
      case 2:
        return <h2 key={key}>{children}</h2>;
      case 3:
        return <h3 key={key}>{children}</h3>;
      case 4:
        return <h4 key={key}>{children}</h4>;
      case 5:
        return <h5 key={key}>{children}</h5>;
      case 6:
        return <h6 key={key}>{children}</h6>;
    }
  }
  if (block.type === 'quote') return <blockquote key={key}>{children}</blockquote>;
  if (block.type === 'code') return <pre key={key}>{children}</pre>;

  return <p key={key}>{children}</p>;
}

export default function CareerDescription({ career }: { career: StrapiCareer }) {
  return (
    <div className="career-description">
      {career.description.map(renderCareerBlock)}
    </div>
  );
}
