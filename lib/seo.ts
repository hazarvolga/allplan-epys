import type { Metadata } from "next";
import { site, absoluteUrl } from "./site";
const approved: Record<string, { title: string; description: string }> = {
  "": {
    title: "ALLPLAN ile Dijital Proje ve e-PYS Hazırlığı",
    description:
      "Yeni proje teslim dönemini, ALLPLAN iş akışlarını ve Revit/Archicad karşılaştırmasını inceleyin.",
  },
  "dijital-proje-yonetmeligi": {
    title: "Dijital Proje Yönetmeliği: Kapsam ve Geçiş Takvimi",
    description:
      "PDF/A, BIM ve IFC teslim gereklerini proje kapsamı ve aşamalı uygulama tarihleriyle değerlendirin.",
  },
  "allplan-revit-archicad": {
    title: "ALLPLAN, Revit ve Archicad: IFC İş Akışı Karşılaştırması",
    description:
      "Bilgi eşleştirme, mahal-kaplama ve teslim hazırlığını aynı görevler üzerinden karşılaştırın.",
  },
  "ifc-pdfa-teslim-rehberi": {
    title: "IFC ve PDF/A Teslimine Hazırlık Rehberi",
    description:
      "Proje bilgisi, model sınıfları, revizyon ve teslim kontrolü için uygulanabilir bir hazırlık sırası.",
  },
};
export function metadataFor(
  slug: string,
  title: string,
  description: string,
  noindex = false,
): Metadata {
  const copy = approved[slug] || {
    title: title.slice(0, 60),
    description: description.slice(0, 155),
  };
  const canonical = absoluteUrl(`/tr${slug ? `/${slug}` : ""}`);
  return {
    ...copy,
    alternates: canonical
      ? { canonical, languages: { tr: canonical, "x-default": canonical } }
      : undefined,
    robots: { index: !noindex && !!site.url, follow: true },
    openGraph: {
      ...copy,
      type: "website",
      locale: "tr_TR",
      siteName: site.publisher,
      ...(canonical ? { url: canonical } : {}),
      images: [
        {
          url: "/tr/opengraph-image",
          width: 1200,
          height: 630,
          alt: site.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      ...copy,
      images: ["/tr/opengraph-image"],
    },
  };
}
export type JsonLd = {
  "@context"?: string;
  "@type": string;
  [key: string]: unknown;
};
export function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.publisher,
    url: site.corporateUrl,
    sameAs: [site.corporateUrl],
  };
}
export function pageSchemas(
  slug: string,
  title: string,
  description: string,
  article = false,
): JsonLd[] {
  const url = absoluteUrl(`/tr/${slug}`);
  const result: JsonLd[] = [];
  if (url) {
    result.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Ana sayfa",
          item: absoluteUrl("/tr"),
        },
        { "@type": "ListItem", position: 2, name: title, item: url },
      ],
    });
  }
  if (article)
    result.push({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      dateModified: site.verifiedAt,
      inLanguage: "tr",
      ...(url ? { mainEntityOfPage: url } : {}),
      publisher: {
        "@type": "Organization",
        name: site.publisher,
        url: site.corporateUrl,
      },
      ...(site.author
        ? { author: { "@type": "Person", name: site.author } }
        : {}),
    });
  if (slug === "allplan-ile-hazirlik")
    result.push({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "ALLPLAN",
      applicationCategory: "DesignApplication",
      url: "https://www.allplan.com",
      description: "BIM / IFC",
      publisher: { "@type": "Organization", name: "ALLPLAN" },
    });
  return result;
}
