import { createHmac } from "node:crypto";
import { isIP } from "node:net";
export interface Limiter {
  allow(keys: string[]): Promise<boolean>;
}
export function trustedAddress(headers: Headers, provider?: string): string {
  const header =
    provider === "vercel"
      ? "x-vercel-forwarded-for"
      : provider === "nginx"
        ? "x-real-ip"
        : undefined;
  const address = header
    ? headers.get(header)?.split(",")[0]?.trim()
    : undefined;
  return address && isIP(address) ? address : "unknown";
}
export function rateKeys(secret: string, ip: string, email: string): string[] {
  return [`ip:${ip}`, `email:${email.toLowerCase()}`].map(
    (value) =>
      `demo:${createHmac("sha256", secret).update(value).digest("hex")}`,
  );
}
/** Development only. Unknown addresses intentionally share one IP bucket. */
export class MemoryLimiter implements Limiter {
  private entries = new Map<string, { count: number; expires: number }>();
  constructor(private now: () => number = Date.now) {}
  async allow(keys: string[]): Promise<boolean> {
    const now = this.now();
    for (const [key, value] of this.entries)
      if (value.expires <= now) this.entries.delete(key);
    if (
      this.entries.size >= 10000 &&
      keys.some((key) => !this.entries.has(key))
    )
      return false;
    const counts = keys.map((key) => {
      const prior = this.entries.get(key);
      const value = {
        count: (prior?.count ?? 0) + 1,
        expires: prior?.expires ?? now + 900000,
      };
      this.entries.set(key, value);
      return value.count;
    });
    return counts.every((count) => count <= 5);
  }
}
const SCRIPT =
  "local allowed=1; for i,key in ipairs(KEYS) do local n=redis.call('INCR',key); if n==1 then redis.call('EXPIRE',key,900) end; if n>5 then allowed=0 end end; return allowed";
export class RedisLimiter implements Limiter {
  constructor(
    private url: string,
    private token: string,
    private fetcher: typeof fetch = fetch,
  ) {}
  async allow(keys: string[]): Promise<boolean> {
    const response = await this.fetcher(this.url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(["EVAL", SCRIPT, keys.length, ...keys]),
      signal: AbortSignal.timeout(5000),
      redirect: "error",
      cache: "no-store",
    });
    if (!response.ok) throw Error("Rate service unavailable");
    const body: unknown = await response.json();
    if (
      !body ||
      typeof body !== "object" ||
      !("result" in body) ||
      (body.result !== 0 && body.result !== 1)
    )
      throw Error("Invalid rate response");
    return body.result === 1;
  }
}
