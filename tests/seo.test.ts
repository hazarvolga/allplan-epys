import { describe, it, expect, vi, afterEach } from "vitest";
import { pages } from "../content/pages";
import { pageMarkdown, llmsMarkdown } from "../lib/markdown";
import { metadataFor } from "../lib/seo";
afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});
describe("publication metadata", () => {
  it("keeps draft routes out of markdown exports", () => {
    expect(pageMarkdown("bursa-dijital-proje")).toBeNull();
    expect(pageMarkdown("kvkk")).toBeNull();
  });
  it("renders comparison table and FAQ text in markdown", () => {
    expect(pageMarkdown("allplan-revit-archicad")).toContain("| Ölçüt |");
    expect(pageMarkdown("sik-sorulan-sorular")).toContain(
      "ALLPLAN kullanmak zorunlu mu?",
    );
    expect(llmsMarkdown(true)).toContain("01.09.2033");
  });
  it("has bounded titles/descriptions", () => {
    for (const page of pages) {
      const meta = metadataFor(
        page.slug,
        page.title,
        page.description,
        page.noindex,
      );
      expect(String(meta.title).length).toBeLessThanOrEqual(60);
      expect(meta.description!.length).toBeLessThanOrEqual(155);
    }
  });
  it("does not invent author or domain in preview", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("NEXT_PUBLIC_CONTENT_AUTHOR", "");
    vi.resetModules();
    const seo = await import("../lib/seo");
    const { default: sitemap } = await import("../app/sitemap");
    expect(
      seo.pageSchemas("dijital-proje-yonetmeligi", "Başlık", "Özet", true)[0],
    ).not.toHaveProperty("author");
    expect(sitemap()).toEqual([]);
    expect(seo.metadataFor("demo", "Demo", "Özet").robots).toMatchObject({
      index: false,
    });
  });
  it("generates configured canonical and sitemap without drafts", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://site.example");
    vi.resetModules();
    const seo = await import("../lib/seo");
    const { default: sitemap } = await import("../app/sitemap");
    const { default: robots } = await import("../app/robots");
    expect(seo.metadataFor("demo", "Demo", "Özet").alternates).toMatchObject({
      canonical: "https://site.example/tr/demo",
      languages: { tr: "https://site.example/tr/demo" },
    });
    expect(sitemap()).toHaveLength(8);
    expect(sitemap().every((s) => !s.url.includes("bursa"))).toBe(true);
    expect(robots().rules).toContainEqual({ userAgent: "*", allow: "/" });
    expect(
      seo.metadataFor("bursa-dijital-proje", "Bursa", "Özet", true).robots,
    ).toMatchObject({ index: false });
  });
  it("respects AI crawler opt-out independently", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://site.example");
    vi.stubEnv("ALLOW_AI_CRAWLERS", "false");
    vi.resetModules();
    const { default: robots } = await import("../app/robots");
    expect(robots().rules).toContainEqual({
      userAgent: "GPTBot",
      disallow: "/",
    });
    expect(robots().rules).toContainEqual({ userAgent: "*", allow: "/" });
  });
});
