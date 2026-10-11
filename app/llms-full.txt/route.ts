import { llmsMarkdown } from "@/lib/markdown";
export const dynamic = "force-static";
export function GET() {
  return new Response(llmsMarkdown(true), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
