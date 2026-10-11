/** Local integration fixture: synthetic delivery and Redis responses only. */
import { appendFileSync } from "node:fs";
const originalFetch = globalThis.fetch;
const logPath = process.env.DEMO_FIXTURE_LOG;
if (!logPath) throw new Error("DEMO_FIXTURE_LOG is required");
globalThis.fetch = async (input, init = {}) => {
  const url = new URL(
    typeof input === "string" || input instanceof URL ? input : input.url,
  );
  if (url.href === "https://redis.invalid/rate") {
    return Response.json({ result: 1 });
  }
  if (url.href === "https://delivery.invalid/demo") {
    const body = JSON.parse(String(init.body));
    const headers = new Headers(init.headers);
    const status = body.data.topic.includes("test-failure") ? 503 : 200;
    appendFileSync(
      logPath,
      JSON.stringify({
        idempotencyKey: headers.get("Idempotency-Key"),
        data: body.data,
        status,
      }) + "\n",
    );
    return Response.json({ accepted: status === 200 }, { status });
  }
  if (["127.0.0.1", "localhost", "[::1]"].includes(url.hostname)) {
    return originalFetch(input, init);
  }
  throw new Error("External network blocked by demo test fixture");
};
