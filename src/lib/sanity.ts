import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "j32qn256",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

export interface SanitySystem {
  _id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  slug: string;
}

export interface SanitySubcategory {
  _id: string;
  title: string;
  slug: string;
  systemSlug: string;
  summary: string;
  order?: number;
  content?: unknown[];
}

export interface SanityArticle {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  systemSlug: string;
  publishedAt?: string;
}

export interface SanitySystemWithSubs extends SanitySystem {
  subcategories: SanitySubcategory[];
  articles: SanityArticle[];
}

const systemFields = `
  _id,
  index,
  title,
  tagline,
  description,
  longDescription,
  "slug": slug.current
`;

const subFields = `
  _id,
  title,
  "slug": slug.current,
  systemSlug,
  summary,
  "order": order,
  content
`;

const articleFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  systemSlug,
  publishedAt
`;

export async function getAllSystems(): Promise<SanitySystem[]> {
  return sanityClient.fetch(
    `*[_type == "system"] | order(order asc) { ${systemFields} }`
  );
}

export async function getSystemBySlug(
  slug: string
): Promise<SanitySystemWithSubs | null> {
  return sanityClient.fetch(
    `*[_type == "system" && slug.current == $slug][0] {
      ${systemFields},
      "subcategories": *[_type == "subcategory" && systemSlug == $slug] | order(order asc) {
        ${subFields}
      },
      "articles": *[_type == "article" && systemSlug == $slug] | order(coalesce(publishedAt, _createdAt) desc) {
        ${articleFields}
      }
    }`,
    { slug }
  );
}

export async function getSubcategory(
  systemSlug: string,
  subSlug: string
): Promise<(SanitySubcategory & { system: SanitySystem | null }) | null> {
  return sanityClient.fetch(
    `*[_type == "subcategory" && systemSlug == $systemSlug && slug.current == $subSlug][0] {
      ${subFields},
      "system": *[_type == "system" && slug.current == ^.systemSlug][0] { ${systemFields} }
    }`,
    { systemSlug, subSlug }
  );
}
