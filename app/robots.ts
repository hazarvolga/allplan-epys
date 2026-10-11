import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", ...(site.url ? { allow: "/" } : { disallow: "/" }) },
      ...[
        "GPTBot",
        "ClaudeBot",
        "PerplexityBot",
        "Google-Extended",
        "OAI-SearchBot",
      ].map((userAgent) => ({
        userAgent,
        ...(site.allowAi && site.url ? { allow: "/" } : { disallow: "/" }),
      })),
    ],
    ...(site.url ? { sitemap: `${site.url}/sitemap.xml` } : {}),
  };
}
