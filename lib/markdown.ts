import { home } from "@/content/home";
import { pages } from "@/content/pages";
import { faqs } from "@/content/faq";
import { sources } from "@/content/sources";
import { tables } from "@/content/tables";
import { site } from "@/lib/site";
import type { ContentSection } from "@/content/types";
function sectionMarkdown(section: ContentSection) {
  const table = section.tableId ? tables[section.tableId] : null;
  return [
    `## ${section.title}`,
    ...section.paragraphs,
    ...(section.items || []).map((i) => `- ${i}`),
    ...(table
      ? [
          `| ${table.headers.join(" | ")} |`,
          `| ${table.headers.map(() => "---").join(" | ")} |`,
          ...table.rows.map((row) => `| ${row.join(" | ")} |`),
          table.note || "",
        ]
      : []),
    ...(section.sources || []).map((id) => {
      const s = sources.find((s) => s.id === id)!;
      return `[${id}: ${s.title}](${s.url})`;
    }),
  ].join("\n\n");
}
export function pageMarkdown(slug: string) {
  const page = pages.find((p) => p.slug === slug && !p.noindex);
  if (!page) return null;
  return [
    `# ${page.title}`,
    page.description,
    ...page.sections.map(sectionMarkdown),
    ...(slug === "sik-sorulan-sorular"
      ? faqs.map((f) => `## ${f.question}\n\n${f.answer}`)
      : []),
    ...(slug === "kaynaklar"
      ? sources.map((s) => `- [${s.id}: ${s.title}](${s.url})`)
      : []),
  ].join("\n\n");
}
export function llmsMarkdown(full = false) {
  return [
    `# ${site.name}`,
    home.description,
    `Yayıncı: ${site.publisher}. İçerik doğrulama tarihi: ${site.verifiedAt}.`,
    `## Sayfalar`,
    ...pages
      .filter((p) => !p.noindex)
      .map((p) => `- [${p.title}](${site.url}/tr/${p.slug}): ${p.description}`),
    ...(full
      ? [
          ...home.sections.map(sectionMarkdown).join("\n\n"),
          ...pages
            .filter((p) => !p.noindex)
            .map((p) => pageMarkdown(p.slug) || ""),
        ]
      : []),
  ].join("\n\n");
}
