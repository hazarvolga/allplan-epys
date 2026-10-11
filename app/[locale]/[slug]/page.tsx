import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { pages } from "@/content/pages";
import { supportPages } from "@/content/support";
import { faqs } from "@/content/faq";
import { assets } from "@/content/assets";
import { site } from "@/lib/site";
import { metadataFor, pageSchemas } from "@/lib/seo";
import { ContentSectionView } from "@/components/content-section";
import { SourceList, SourceReferences } from "@/components/source-references";
import { DemoForm } from "@/components/demo-form";
import { JsonLdScript } from "@/components/json-ld";
import { Arrow } from "@/components/icons";
type Props = { params: Promise<{ locale: string; slug: string }> };
export function generateStaticParams() {
  return [...pages, ...supportPages].map((page) => ({ slug: page.slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = pages.find((p) => p.slug === slug);
  const support = supportPages.find((p) => p.slug === slug);
  if (!page && !support)
    return { title: "Sayfa bulunamadı", robots: { index: false } };
  return metadataFor(
    slug,
    page?.title || support!.title,
    page?.description || support!.description,
    page?.noindex || !!support,
  );
}
export default async function ContentPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const page = pages.find((p) => p.slug === slug);
  const support = supportPages.find((p) => p.slug === slug);
  if (!page && !support) notFound();
  const title = page?.title || support!.title;
  const description = page?.description || support!.description;
  const editorial = [
    "dijital-proje-yonetmeligi",
    "allplan-revit-archicad",
    "ifc-pdfa-teslim-rehberi",
  ].includes(slug);
  return (
    <main id="main-content" className="page-shell">
      <JsonLdScript data={pageSchemas(slug, title, description, editorial)} />
      {slug === "sik-sorulan-sorular" && (
        <JsonLdScript
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }}
        />
      )}
      <nav className="breadcrumb" aria-label="İçerik yolu">
        <Link href="/tr">Ana sayfa</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{title}</span>
      </nav>
      <div className="page-heading">
        <div className="eyebrow">ALUPLAN / DİJİTAL PROJE REHBERİ</div>
        <h1>{title}</h1>
        <p>
          {description} {page && <SourceReferences ids={page.sourceIds} />}
        </p>
        {editorial && (
          <div className="editorial">
            <span>
              Son doğrulama tarihi:{" "}
              <time dateTime={site.verifiedAt}>11 Ekim 2026</time>
            </span>
            <span>Yazar: {site.author || "Atama bekleniyor"}</span>
            <span>Gözden geçiren: {site.reviewer || "Atama bekleniyor"}</span>
          </div>
        )}
      </div>
      {support && (
        <div className="legal-draft">
          {support.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <div className="todo-notice">
            <span className="mono">İÇERİK HAZIRLIĞI</span>
            {support.todo}
          </div>
          <a
            href={site.corporateUrl}
            className="text-link"
            target="_blank"
            rel="noreferrer"
          >
            aluplan.com.tr <Arrow diagonal />
          </a>
        </div>
      )}
      {page && (
        <>
          <div className="article-layout">
            {page.sections.length > 0 && (
              <nav className="article-toc" aria-label="Bu sayfada">
                <span className="mono">BU SAYFADA</span>
                {page.sections.map((s) => (
                  <a href={`#${s.id}`} key={s.id}>
                    {s.title}
                  </a>
                ))}
              </nav>
            )}
            <div
              style={
                !page.sections.length ? { gridColumn: "1 / -1" } : undefined
              }
            >
              {page.sections.map((section, i) => (
                <ContentSectionView
                  key={section.id}
                  section={section}
                  index={i}
                />
              ))}
              {slug === "demo" && (
                <div className="demo-form-wrap">
                  <DemoForm />
                </div>
              )}
              {slug === "sik-sorulan-sorular" && (
                <div className="faq-list">
                  {faqs.map((faq) => (
                    <details key={faq.question} className="faq-item">
                      <summary>{faq.question}</summary>
                      <p>
                        {faq.answer} <SourceReferences ids={faq.sources} />
                      </p>
                    </details>
                  ))}
                </div>
              )}
              {slug === "kaynaklar" && (
                <div className="resource-assets">
                  {assets
                    .filter((asset) => asset.available && asset.href)
                    .map((asset) => (
                      <a key={asset.id} href={asset.href} download>
                        {asset.title}
                        <Arrow diagonal />
                      </a>
                    ))}
                </div>
              )}
              {slug === "bursa-dijital-proje" && (
                <p className="todo-notice">
                  Yerel koşulların ayrıntılı doğrulaması bekleniyor.
                </p>
              )}
            </div>
          </div>
          {page.sourceIds.length > 0 && <SourceList ids={page.sourceIds} />}
        </>
      )}
      <nav className="related-links" aria-label="İlgili içerikler">
        {pages
          .filter((p) => !p.noindex && p.slug !== slug)
          .map((p) => (
            <Link href={`/tr/${p.slug}`} key={p.slug}>
              {
                (
                  {
                    "dijital-proje-yonetmeligi": "Yeni düzenlemeler",
                    "allplan-ile-hazirlik": "ALLPLAN iş akışı",
                    "allplan-revit-archicad": "Karşılaştırma",
                    demo: "Demo",
                    "ifc-pdfa-teslim-rehberi": "Teslim rehberi",
                    "sik-sorulan-sorular": "SSS",
                    kaynaklar: "Kaynaklar",
                  } as Record<string, string>
                )[p.slug]
              }
              <Arrow />
            </Link>
          ))}
      </nav>
    </main>
  );
}
