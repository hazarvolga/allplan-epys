import type { DemoConfig } from "./service";
export function getDemoConfig(): DemoConfig {
  return {
    webhook: process.env.DEMO_WEBHOOK_URL,
    token: process.env.DEMO_WEBHOOK_TOKEN,
    publisher:
      process.env.PUBLISHER_NAME ||
      process.env.NEXT_PUBLIC_PUBLISHER ||
      "Aluplan",
    legalReady: process.env.DEMO_LEGAL_READY === "true",
    rateSecret: process.env.DEMO_RATE_SECRET,
    production: process.env.NODE_ENV === "production",
    redisUrl: process.env.DEMO_REDIS_REST_URL,
    redisToken: process.env.DEMO_REDIS_REST_TOKEN,
  };
}
