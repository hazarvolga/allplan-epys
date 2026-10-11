import Link from "next/link";
import { tables } from "@/content/tables";
import type { ContentSection } from "@/content/types";
import { SourceReferences } from "./source-references";
import { DataTable } from "./data-table";
import { Arrow } from "./icons";
export function ContentSectionView({
  section,
  index,
}: {
  section: ContentSection;
  index: number;
}) {
  return (
    <section id={section.id} className="article-section">
      <div className="section-index mono">
        {String(index + 1).padStart(2, "0")} /
      </div>
      <div>
        <h2>{section.title}</h2>
        {section.paragraphs.map((p) => (
          <p key={p}>
            {p} <SourceReferences ids={section.sources || []} />
          </p>
        ))}
        {section.items && (
          <ol className="article-list">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        )}
        {section.tableId && (
          <DataTable
            table={tables[section.tableId]}
            interactive={section.tableId === "timeline"}
          />
        )}
        {section.cta && (
          <Link href={`/tr${section.cta.href}`} className="text-link">
            {section.cta.label}
            <Arrow />
          </Link>
        )}
      </div>
    </section>
  );
}
