type StrapiMedia = {
  id?: number;
  url?: string;
  alternativeText?: string | null;
  formats?: Record<string, { url?: string }>;
};

type StrapiRichBlock = unknown;

export type StrapiInsight = {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  coverImage?: StrapiMedia | null;
  publishedDate?: string | null;
  authorName?: string | null;
  category?: string | null;
  content?: StrapiRichBlock[] | null;
  readingTime?: number | null;
  excerpt?: string | null;
  body?: string | null;
  publishedAt?: string | null;
};

type StrapiV4Insight = {
  id: number;
  attributes: Omit<StrapiInsight, 'id' | 'documentId'>;
};

type StrapiResponse<T> = {
  data: T;
};

export type StrapiCareerText = {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};

export type StrapiCareerInline =
  | StrapiCareerText
  | {
      type: 'link';
      url: string;
      children: StrapiCareerText[];
    };

export type StrapiCareerListItem = {
  type: 'list-item';
  children: StrapiCareerInline[];
};

export type StrapiCareerListBlock = {
  type: 'list';
  format: 'ordered' | 'unordered';
  children: Array<StrapiCareerListItem | StrapiCareerListBlock>;
};

export type StrapiCareerBlock =
  | {
      type: 'paragraph' | 'quote' | 'code';
      children: StrapiCareerInline[];
    }
  | {
      type: 'heading';
      level: 1 | 2 | 3 | 4 | 5 | 6;
      children: StrapiCareerInline[];
    }
  | StrapiCareerListBlock;

export type StrapiCareer = {
  id: number;
  documentId?: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  description: StrapiCareerBlock[];
  publishedAt?: string | null;
};

type StrapiV4Career = {
  id: number;
  attributes: Omit<StrapiCareer, 'id' | 'documentId'>;
};

const strapiBaseUrl = (process.env.STRAPI_URL?.trim() || 'http://localhost:1337').replace(
  /\/+$/,
  '',
);

function getStrapiHeaders(): HeadersInit {
  const token = process.env.STRAPI_API_TOKEN?.trim();
  return token ? { Authorization: ['Bearer ', token].join('') } : {};
}

function unwrapMedia(value: unknown): StrapiMedia | null | undefined {
  if (!value) return value as null | undefined;
  if (typeof value === 'object' && 'data' in value) {
    const nested = value.data;
    if (nested && typeof nested === 'object' && 'attributes' in nested) {
      return unwrapMedia((nested as { attributes: unknown }).attributes) ?? undefined;
    }
    return nested as StrapiMedia | null | undefined;
  }

  if (typeof value === 'object' && 'attributes' in value) {
    const { attributes, id } = value as { attributes: Record<string, unknown>; id?: number };
    return {
      id,
      ...(attributes as Record<string, unknown>),
    } as StrapiMedia;
  }

  return value as StrapiMedia;
}

function normalizeInsight(
  insight: StrapiInsight | StrapiV4Insight,
): StrapiInsight {
  if ('attributes' in insight) {
    const normalized = { id: insight.id, ...insight.attributes } as StrapiInsight;
    if (normalized.coverImage) {
      normalized.coverImage = unwrapMedia(normalized.coverImage) ?? null;
    }
    return normalized;
  }

  const normalized = { ...insight } as StrapiInsight;
  if (normalized.coverImage) {
    normalized.coverImage = unwrapMedia(normalized.coverImage) ?? null;
  }
  return normalized;
}

async function fetchStrapi<T>(path: string): Promise<T> {
  const response = await fetch(`${strapiBaseUrl}/api/${path}`, {
    headers: getStrapiHeaders(),
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(
      `Strapi request failed (${response.status} ${response.statusText}) for /api/${path}.`,
    );
  }

  const result = (await response.json()) as StrapiResponse<T>;
  return result.data;
}

export async function getLatestInsights(limit = 6): Promise<StrapiInsight[]> {
  const params = new URLSearchParams({
    'sort[0]': 'publishedDate:desc',
    'sort[1]': 'publishedAt:desc',
    'pagination[pageSize]': String(limit),
    'populate': 'coverImage',
  });
  const data = await fetchStrapi<Array<StrapiInsight | StrapiV4Insight>>(
    `insights?${params.toString()}`,
  );

  return data.map(normalizeInsight);
}

export async function getInsightBySlug(
  slug: string,
): Promise<StrapiInsight | null> {
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
    'pagination[pageSize]': '1',
    'populate': 'coverImage',
  });
  const data = await fetchStrapi<Array<StrapiInsight | StrapiV4Insight>>(
    `insights?${params.toString()}`,
  );
  const insight = data[0];

  return insight ? normalizeInsight(insight) : null;
}

export async function getCareers(): Promise<StrapiCareer[]> {
  const params = new URLSearchParams({
    'sort[0]': 'publishedAt:desc',
    'pagination[pageSize]': '100',
  });
  const data = await fetchStrapi<Array<StrapiCareer | StrapiV4Career>>(
    `careers?${params.toString()}`,
  );

  return data.map((career) =>
    'attributes' in career
      ? { id: career.id, ...career.attributes }
      : career,
  );
}
