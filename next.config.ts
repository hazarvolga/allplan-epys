import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://plausible.io",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' https://plausible.io",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(process.env.NODE_ENV === "development"
    ? []
    : ["upgrade-insecure-requests"]),
].join("; ");
const config: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async rewrites() {
    return [{ source: "/:slug.md", destination: "/api/markdown/:slug" }];
  },
  experimental: { serverActions: { bodySizeLimit: "64kb" } },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              process.env.NODE_ENV === "development"
                ? csp.replace(
                    "script-src 'self' 'unsafe-inline'",
                    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
                  )
                : csp,
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "X-Frame-Options", value: "DENY" },
          ...(process.env.NODE_ENV === "production"
            ? [
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=31536000; includeSubDomains",
                },
              ]
            : []),
        ],
      },
    ];
  },
};
export default createNextIntlPlugin("./i18n/request.ts")(config);
