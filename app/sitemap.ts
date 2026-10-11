import type { MetadataRoute } from "next";
import { pages } from "@/content/pages";
import { site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];
  return ["", ...pages.filter((p) => !p.noindex).map((p) => p.slug)].map(
    (slug) => ({
      url: `${site.url}/tr${slug ? `/${slug}` : ""}`,
      lastModified: new Date(site.verifiedAt),
      changeFrequency: "monthly",
      priority: slug ? 0.7 : 1,
    }),
  );
}
