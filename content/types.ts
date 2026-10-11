export type SourceId = "K1" | "K2" | "K3" | "U1" | "U2" | "U3" | "U4" | "U5";
export type Source = {
  id: SourceId;
  title: string;
  url: string;
  secondary?: { title: string; url: string };
};
export type ContentTable = {
  id: string;
  caption: string;
  headers: readonly string[];
  rows: readonly (readonly string[])[];
  sources: readonly SourceId[];
  note?: string;
};
export type ContentSection = {
  id: string;
  title: string;
  paragraphs: readonly string[];
  items?: readonly string[];
  sources?: readonly SourceId[];
  tableId?: "timeline" | "comparison" | "workflow";
  cta?: { label: string; href: string };
};
export type PageContent = {
  slug: string;
  title: string;
  description: string;
  sections: readonly ContentSection[];
  sourceIds: readonly SourceId[];
  noindex?: boolean;
  editorial?: boolean;
};
