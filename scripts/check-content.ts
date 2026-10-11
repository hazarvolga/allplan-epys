import { loadBuildEnv } from "./build-env";
import { fileURLToPath } from "node:url";
import { resolve, relative } from "node:path";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { home } from "../content/home";
import { pages } from "../content/pages";
import { faqs } from "../content/faq";
import { tables } from "../content/tables";
import { sources } from "../content/sources";
import { assets } from "../content/assets";
import { supportPages } from "../content/support";

const forbidden = [
  /bakanlık\s+onaylı/iu,
  /tek\s+uyumlu\s+bim\s+programı/iu,
  /garantili\s+ruhsat/iu,
  /sıfır\s+hata/iu,
  /en\s+hızlı/iu,
  /en\s+ucuz/iu,
  /(?:%\s*\d+(?:[.,]\d+)?|yüzde\s+\d+(?:[.,]\d+)?)[^.!?\n]{0,80}(?:tasarruf|kazanç|hız|ucuz)/iu,
  /(?:tasarruf|kazanç)[^.!?\n]{0,80}(?:%\s*\d+|yüzde\s+\d+)/iu,
  /bakanlıkça\s+sertifikalı/iu,
  /hazır\s+e-pys\s+şablonu/iu,
  /doğrudan\s+e-pys.{0,12}yükle/iu,
];
const sourceIds = new Set<string>(sources.map((source) => source.id));
const publishedContent = {
  home,
  pages,
  faqs,
  tables,
  sources,
  assets,
  supportPages,
};

/** Validate only public structured content, never editorial source documents. */
export function validateContent(content: unknown = publishedContent): string[] {
  const errors: string[] = [];
  function visit(value: unknown, path: string): void {
    if (typeof value === "string") {
      for (const pattern of forbidden)
        if (pattern.test(value)) errors.push(`${path}: prohibited claim`);
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((item, index) => visit(item, `${path}[${index}]`));
      return;
    }
    if (value && typeof value === "object") {
      const record = value as Record<string, unknown>;
      for (const [key, item] of Object.entries(record)) {
        if ((key === "sources" || key === "sourceIds") && Array.isArray(item)) {
          for (const id of item)
            if (typeof id === "string" && !sourceIds.has(id))
              errors.push(`${path}.${key}: unknown source ${id}`);
        }
        visit(item, `${path}.${key}`);
      }
      if (
        record.available === true &&
        (typeof record.href !== "string" || !record.href.trim())
      )
        errors.push(`${path}: available asset needs href`);
    }
  }
  visit(content, "content");
  return errors;
}

/** Scan all public code surfaces so JSX and metadata cannot bypass content safety. */
export function scanPublicSources(root: string): string[] {
  const errors: string[] = [];
  function walk(directory: string): void {
    if (!existsSync(directory)) return;
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      if (entry.name === "__tests__" || entry.name === "tests") continue;
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (
        /\.tsx?$/.test(entry.name) &&
        !/\.(?:test|spec)\.tsx?$/.test(entry.name)
      ) {
        for (const error of validateContent(readFileSync(path, "utf8")))
          errors.push(`${relative(root, path)}: ${error}`);
      }
    }
  }
  for (const directory of ["app", "components", "lib", "content"])
    walk(resolve(root, directory));
  return errors;
}

/** Input is explicit so tests never depend on the caller's live environment. */
export function validatePublicEnvironment(
  environment: Readonly<Record<string, string | undefined>>,
): string[] {
  return validateContent(
    Object.fromEntries(
      Object.entries(environment).filter(([key]) =>
        key.startsWith("NEXT_PUBLIC_"),
      ),
    ),
  );
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  loadBuildEnv();
  const errors = [
    ...validateContent(),
    ...scanPublicSources(process.cwd()),
    ...validatePublicEnvironment(process.env),
  ];
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
  } else
    console.log(
      "Content safety: all published claims, source references and assets passed.",
    );
}
