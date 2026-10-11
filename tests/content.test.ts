import assert from "node:assert/strict";
import { test } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  validateContent,
  scanPublicSources,
  validatePublicEnvironment,
} from "../scripts/check-content";
import { home } from "../content/home";
import { pages } from "../content/pages";
import { assets } from "../content/assets";
import { tables } from "../content/tables";

test("published content passes safety and source validation", () => {
  assert.deepEqual(validateContent(), []);
});
test("unsafe claims, savings claims and unknown sources are rejected", () => {
  assert.ok(
    validateContent({ text: "Garantili ruhsat", sources: ["K99"] }).length >= 2,
  );
  assert.ok(validateContent({ text: "%40 zaman tasarrufu" }).length > 0);
  assert.ok(validateContent({ text: "yüzde 40 maliyet tasarrufu" }).length > 0);
});
test("homepage follows approved seven-section sequence", () => {
  assert.deepEqual(
    home.sections.map((section) => section.id),
    [
      "change",
      "timeline",
      "benefits",
      "scenario",
      "comparison",
      "plan",
      "contact",
    ],
  );
});
test("Bursa is excluded from indexing and assets have no premature URLs", () => {
  assert.equal(
    pages.find((page) => page.slug === "bursa-dijital-proje")?.noindex,
    true,
  );
  assert.ok(assets.every((asset) => !asset.available && !("href" in asset)));
});
test("legal timeline preserves every conditional period and comparisons are rectangular", () => {
  assert.equal(tables.timeline.rows.length, 8);
  assert.ok(tables.timeline.rows.at(-1)?.[1].includes("Sanayi, ofis, otel"));
  for (const table of Object.values(tables))
    assert.ok(table.rows.every((row) => row.length === table.headers.length));
});
test("asset availability requires a nonempty URL without blocking planned assets", () => {
  assert.ok(validateContent({ available: true }).length > 0);
  assert.ok(validateContent({ available: true, href: " " }).length > 0);
  assert.deepEqual(validateContent({ available: false }), []);
  assert.deepEqual(
    validateContent({ available: true, href: "/examples/model.ifc" }),
    [],
  );
});
test("sourceId references validate and non-text optional data is accepted", () => {
  assert.ok(validateContent({ sourceIds: ["MISSING"] }).length > 0);
  assert.deepEqual(
    validateContent({ sourceIds: ["K1"], optional: null, count: 1 }),
    [],
  );
});

test("public source scanner rejects unsafe JSX and metadata while excluding tests", () => {
  const root = mkdtempSync(join(tmpdir(), "allplan-content-"));
  try {
    for (const folder of ["app", "lib", "components", "content"])
      mkdirSync(join(root, folder));
    writeFileSync(join(root, "app", "page.tsx"), "<p>Garantili ruhsat</p>");
    writeFileSync(
      join(root, "lib", "seo.ts"),
      "export const title = 'en ucuz';",
    );
    writeFileSync(
      join(root, "components", "safe.tsx"),
      "<p>Proje hazırlığı</p>",
    );
    writeFileSync(
      join(root, "content", "claim.test.ts"),
      "const fixture = 'sıfır hata';",
    );
    const errors = scanPublicSources(root);
    assert.equal(errors.length, 2);
    assert.ok(errors.some((error) => error.includes("app/page.tsx")));
    assert.ok(errors.some((error) => error.includes("lib/seo.ts")));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
test("public environment scanner validates configured copy without reading unrelated secrets", () => {
  assert.ok(
    validatePublicEnvironment({ NEXT_PUBLIC_PUBLISHER: "Bakanlık onaylı" })
      .length > 0,
  );
  assert.deepEqual(
    validatePublicEnvironment({
      NEXT_PUBLIC_PUBLISHER: "Aluplan",
      PRIVATE_SECRET: "sıfır hata",
    }),
    [],
  );
});
