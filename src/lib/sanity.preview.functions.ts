import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@sanity/client";

const previewClient = () =>
  createClient({
    projectId: "j32qn256",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false,
    token: process.env.SANITY_API_READ_TOKEN,
    perspective: "drafts",
  });

const systemFields = `
  _id, index, title, tagline, description, longDescription,
  "slug": slug.current
`;
const subFields = `
  _id, title, "slug": slug.current, systemSlug, summary,
  "order": order, content
`;

export const getSubcategoryPreview = createServerFn({ method: "GET" })
  .inputValidator(
    (data: { systemSlug: string; subSlug: string }) => data
  )
  .handler(async ({ data }) => {
    const client = previewClient();
    const result = await client.fetch(
      `*[_type == "subcategory" && systemSlug == $systemSlug && slug.current == $subSlug][0] {
        ${subFields},
        "system": *[_type == "system" && slug.current == ^.systemSlug][0] { ${systemFields} },
        "_isDraft": _id in path("drafts.**")
      }`,
      { systemSlug: data.systemSlug, subSlug: data.subSlug }
    );
    return {
      data: result ?? null,
      hasToken: Boolean(process.env.SANITY_API_READ_TOKEN),
    };
  });
