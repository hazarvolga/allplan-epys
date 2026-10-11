import { loadBuildEnv } from "./build-env";
loadBuildEnv();
const fields = [
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_CONTENT_AUTHOR",
  "NEXT_PUBLIC_CONTENT_REVIEWER",
];
for (const field of fields)
  if (!process.env[field])
    console.warn(
      `[publish readiness] ${field} missing; preview is not production publication.`,
    );
if (!process.env.DEMO_WEBHOOK_URL)
  console.warn(
    "[publish readiness] Demo delivery not configured; submissions stay disabled.",
  );
