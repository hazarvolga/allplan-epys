"use client";
import { useState } from "react";
import type { ContentTable } from "@/content/types";
import { SourceReferences } from "./source-references";
export function DataTable({
  table,
  interactive = false,
}: {
  table: ContentTable;
  interactive?: boolean;
}) {
  const [selected, setSelected] = useState("all");
  return (
    <div
      className={`data-table ${table.id === "timeline" ? "timeline-table" : ""}`}
    >
      {interactive && (
        <div className="timeline-filter">
          <label htmlFor="timeline-focus">İncelemek istediğiniz dönem</label>
          <select
            id="timeline-focus"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="all">Tüm dönemler</option>
            <option value="pdf">PDF/A hazırlığı</option>
            <option value="ifc">Konut / ticaret+konut — IFC</option>
            <option value="ifc-3">
              İl &gt;2 milyon / belediye &gt;600 bin / yapı &gt;10.000 m²
            </option>
            <option value="ifc-4">
              İl &gt;2 milyon / belediye &gt;400 bin / yapı &gt;10.000 m²
            </option>
            <option value="ifc-5">
              İl &gt;1 milyon / belediye &gt;300 bin / yapı &gt;10.000 m²
            </option>
            <option value="other">Diğer bina kullanımları</option>
          </select>
          <p>
            Bilgilendirme amaçlıdır. Seçim yalnızca ilgili satırları vurgular.
          </p>
        </div>
      )}
      <div
        className="table-scroll"
        role="region"
        aria-label={table.caption}
        tabIndex={0}
      >
        <table>
          <caption>
            {table.caption} <SourceReferences ids={table.sources} />
          </caption>
          <thead>
            <tr>
              {table.headers.map((h) => (
                <th key={h} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => {
              const highlight =
                (selected === "pdf" && (i === 0 || i === 2)) ||
                (selected === "ifc" && i >= 3 && i <= 6) ||
                (selected === "other" && i === 7) ||
                selected === `ifc-${i}`;
              return (
                <tr key={row[0]} data-highlight={highlight || undefined}>
                  {row.map((cell, j) =>
                    j === 0 ? (
                      <th key={j} scope="row">
                        {cell}
                      </th>
                    ) : (
                      <td key={j} data-label={table.headers[j]}>
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {table.note && (
        <p className="table-note">
          {table.note} <SourceReferences ids={table.sources} />
        </p>
      )}
    </div>
  );
}
