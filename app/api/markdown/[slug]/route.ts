import { pageMarkdown } from "@/lib/markdown";
export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const text = pageMarkdown(slug);
  return new Response(text || "Not found", {
    status: text ? 200 : 404,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Robots-Tag": "noindex",
    },
  });
}
