import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { home } from "@/content/home";
import { tables } from "@/content/tables";
import { metadataFor, organizationSchema } from "@/lib/seo";
import { site, absoluteUrl } from "@/lib/site";
import { Drawing } from "@/components/drawing";
import { Scenario } from "@/components/scenario";
import { Arrow } from "@/components/icons";
import { SourceReferences, SourceList } from "@/components/source-references";
import { DataTable } from "@/components/data-table";
import { JsonLdScript } from "@/components/json-ld";
export function generateMetadata() {
  return metadataFor("", home.title, home.description);
}
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main id="main-content">
      <JsonLdScript
        data={[
          organizationSchema(),
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: site.name,
            inLanguage: "tr",
            ...(site.url ? { url: absoluteUrl("/tr") } : {}),
          },
        ]}
      />
      <section className="hero">
        <div className="hero-meta mono">
          <span>DİJİTAL PROJE / e-PYS HAZIRLIĞI</span>
          <span>TEKNİK REHBER — 2026</span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot" />
              {home.eyebrow}
            </div>
            <h1>
              {home.title.split("ALLPLAN")[0]}
              <em>ALLPLAN</em>
              {home.title.split("ALLPLAN")[1]}
            </h1>
            <p>{home.description}</p>
            <div className="hero-actions">
              <Link className="button" href={`/tr${home.primaryCta.href}`}>
                {home.primaryCta.label}
                <Arrow diagonal />
              </Link>
              <Link className="text-link" href={`/tr${home.secondaryCta.href}`}>
                {home.secondaryCta.label}
                <Arrow />
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <Drawing />
            <div className="visual-caption">
              <span className="mono">01 / MODEL → TESLİM</span>
              <span>IFC + PDF/A</span>
            </div>
          </div>
        </div>
        <div className="hero-footer">
          <span className="mono">BİLGİ • MODEL • KONTROL</span>
          <p>{home.trustText}</p>
          <Link
            href="#change"
            aria-label="İçeriği keşfet"
            className="down-link"
          >
            ↓
          </Link>
        </div>
      </section>
      {home.sections.map((section, i) => (
        <section
          key={section.id}
          id={section.id}
          className={`home-section section-${section.id}`}
        >
          <div className="section-top">
            <span className="section-index mono">
              {String(i + 2).padStart(2, "0")} /
            </span>
            <span className="mono">
              {
                (
                  {
                    change: "YENİ DÜZENLEMELER",
                    timeline: "GEÇİŞ TAKVİMİ",
                    benefits: "ALLPLAN İŞ AKIŞI",
                    scenario: "SOMUT SENARYO",
                    comparison: "KARŞILAŞTIRMA",
                    plan: "HAZIRLIK PLANI",
                    contact: "BİRLİKTE DEĞERLENDİRELİM",
                  } as Record<string, string>
                )[section.id]
              }
            </span>
          </div>
          <div className="section-intro">
            <h2>{section.title}</h2>
            <div>
              {section.paragraphs.map((p) => (
                <p key={p}>
                  {p} <SourceReferences ids={section.sources || []} />
                </p>
              ))}
              {section.cta && section.id !== "contact" && (
                <Link className="text-link" href={`/tr${section.cta.href}`}>
                  {section.cta.label}
                  <Arrow diagonal />
                </Link>
              )}
            </div>
          </div>
          {section.id === "change" && (
            <div className="change-list">
              {section.items?.map((item, j) => (
                <div key={item}>
                  <span className="mono">0{j + 1}</span>
                  <h3>{item.split(": ")[0]}</h3>
                  <p>
                    {item.split(": ").slice(1).join(": ")}{" "}
                    <SourceReferences ids={section.sources || []} />
                  </p>
                </div>
              ))}
            </div>
          )}
          {section.id === "timeline" && (
            <ol className="timeline-strip">
              {section.items?.map((item, j) => (
                <li key={item}>
                  <span className="timeline-node mono">0{j + 1}</span>
                  <h3>{item.split(": ")[0]}</h3>
                  <p>{item.split(": ").slice(1).join(": ")}</p>
                  <SourceReferences ids={section.sources || []} />
                </li>
              ))}
            </ol>
          )}
          {section.tableId && <DataTable table={tables[section.tableId]} />}
          {section.id === "scenario" && (
            <Scenario steps={section.items || []} />
          )}
          {section.id === "comparison" && (
            <div className="comparison-names" aria-hidden="true">
              <span>ALLPLAN</span>
              <span>Revit</span>
              <span>Archicad</span>
              <span className="mono">
                AYNI GÖREV.
                <br />
                AYNI ÇIKTI.
              </span>
            </div>
          )}
          {section.id === "plan" && (
            <ol className="plan-list">
              {section.items?.map((item, j) => (
                <li key={item}>
                  <span className="mono">0{j + 1}</span>
                  <h3>{item.split(": ")[0]}</h3>
                  <p>{item.split(": ").slice(1).join(": ")}</p>
                </li>
              ))}
            </ol>
          )}
          {section.id === "contact" && section.cta && (
            <Link className="button" href={`/tr${section.cta.href}`}>
              {section.cta.label}
              <Arrow diagonal />
            </Link>
          )}
        </section>
      ))}
      <div className="home-sources">
        <SourceList ids={["K1", "K2", "K3", "U1", "U2", "U3", "U4", "U5"]} />
      </div>
    </main>
  );
}
