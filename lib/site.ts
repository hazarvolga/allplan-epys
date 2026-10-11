const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
export const site = {
  name: "ALLPLAN ile Dijital Proje ve e-PYS Hazırlığı",
  publisher: process.env.NEXT_PUBLIC_PUBLISHER || "Aluplan",
  affiliation:
    process.env.NEXT_PUBLIC_AFFILIATION || "ALLPLAN Türkiye distribütörü",
  corporateUrl: "https://aluplan.com.tr",
  url: configuredUrl || "",
  locale: "tr",
  verifiedAt: "2026-10-11",
  author: process.env.NEXT_PUBLIC_CONTENT_AUTHOR || "",
  reviewer: process.env.NEXT_PUBLIC_CONTENT_REVIEWER || "",
  allowAi: process.env.ALLOW_AI_CRAWLERS !== "false",
  analytics: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "",
} as const;
export const absoluteUrl = (path: string) =>
  site.url ? `${site.url}${path}` : undefined;
export const navigation = [
  { label: "Yeni düzenlemeler", href: "/tr/dijital-proje-yonetmeligi" },
  { label: "ALLPLAN iş akışı", href: "/tr/allplan-ile-hazirlik" },
  { label: "Karşılaştırma", href: "/tr/allplan-revit-archicad" },
  { label: "Kaynaklar", href: "/tr/kaynaklar" },
] as const;
