import { sources } from "@/content/sources";
import type { SourceId } from "@/content/types";
export function SourceReferences({ ids }: { ids: readonly SourceId[] }) {
  return ids.length ? (
    <span className="source-references" aria-label="Kaynaklar">
      {ids.map((id) => {
        const source = sources.find((s) => s.id === id);
        return source ? (
          <a
            key={id}
            href={source.url}
            target="_blank"
            rel="noreferrer"
            title={source.title}
          >
            [{id}]
          </a>
        ) : null;
      })}
    </span>
  ) : null;
}
export function SourceList({ ids }: { ids: readonly SourceId[] }) {
  return (
    <section className="source-list" aria-labelledby="sources-heading">
      <div className="eyebrow">BELGE REFERANSLARI</div>
      <h2 id="sources-heading">Kaynaklar</h2>
      <ul>
        {[...new Set(ids)].map((id) => {
          const source = sources.find((s) => s.id === id);
          return source ? (
            <li key={id}>
              <span className="mono">[{id}]</span>
              <div>
                <a href={source.url} target="_blank" rel="noreferrer">
                  {source.title} ↗
                </a>
                {source.secondary && (
                  <a
                    className="secondary-source"
                    href={source.secondary.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {source.secondary.title} ↗
                  </a>
                )}
              </div>
            </li>
          ) : null;
        })}
      </ul>
    </section>
  );
}
