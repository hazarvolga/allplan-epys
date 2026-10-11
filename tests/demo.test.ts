import { describe, expect, it, vi } from "vitest";
import { demoSchema, processDemo, isDemoReady } from "../lib/demo/service";
import {
  MemoryLimiter,
  RedisLimiter,
  rateKeys,
  trustedAddress,
} from "../lib/demo/rate-limit";
const valid = {
  name: "Ada Yılmaz",
  email: "ada@example.com",
  company: "Ofis",
  discipline: "Mimarlık",
  software: "ALLPLAN",
  projectType: "Konut",
  topic: "IFC çıktısı",
  phone: "",
  consent: "on",
  website: "",
  requestId: "82f5ae64-6eb6-4f16-9983-c11a5bcf22de",
};
const config = {
  webhook: "https://example.com/hook",
  token: "secret",
  publisher: "Yayıncı",
  legalReady: true,
  rateSecret: "synthetic-test-secret-at-least-32-bytes",
  production: false,
};
describe("demo validation", () => {
  it("accepts Turkish characters and optional phone", () =>
    expect(demoSchema.safeParse(valid).success).toBe(true));
  it.each([
    "name",
    "email",
    "company",
    "discipline",
    "software",
    "projectType",
    "topic",
    "consent",
    "requestId",
  ])("requires %s", (key) =>
    expect(demoSchema.safeParse({ ...valid, [key]: "" }).success).toBe(false),
  );
  it("rejects malformed email, invalid types, large messages and unchecked consent", () => {
    for (const patch of [
      { email: "bad" },
      { name: null },
      { topic: "x".repeat(2001) },
      { consent: "false" },
      { phone: "x".repeat(41) },
    ])
      expect(demoSchema.safeParse({ ...valid, ...patch }).success).toBe(false);
  });
});
describe("demo delivery", () => {
  it("rejects short rate HMAC secrets", () => {
    expect(isDemoReady({ ...config, rateSecret: "short" })).toBe(false);
  });
  it("fails closed for missing configuration and insecure production URL", () => {
    expect(isDemoReady({ ...config, token: "" })).toBe(false);
    expect(
      isDemoReady({
        ...config,
        production: true,
        webhook: "http://example.com",
        redisUrl: "https://redis.example.com",
        redisToken: "token",
      }),
    ).toBe(false);
    expect(isDemoReady({ ...config, production: true })).toBe(false);
  });
  it("never sends invalid or honeypot requests", async () => {
    const deliver = vi.fn();
    const limiter = new MemoryLimiter();
    expect(
      (
        await processDemo(
          { ...valid, website: "bot" },
          config,
          limiter,
          "ip",
          deliver,
        )
      ).status,
    ).toBe("error");
    expect(
      (
        await processDemo(
          { ...valid, email: "bad" },
          config,
          limiter,
          "ip",
          deliver,
        )
      ).errors?.email,
    ).toBeTruthy();
    expect(deliver).not.toHaveBeenCalled();
  });
  it("only succeeds after accepted delivery and forwards idempotency", async () => {
    const deliver = vi
      .fn()
      .mockResolvedValue(new Response("", { status: 202 }));
    const result = await processDemo(
      valid,
      config,
      new MemoryLimiter(),
      "ip",
      deliver,
    );
    expect(result.status).toBe("success");
    expect(deliver.mock.calls[0][1].headers["Idempotency-Key"]).toBe(
      valid.requestId,
    );
    expect(deliver.mock.calls[0][1].body).not.toContain("website");
  });
  it("reports rejected deliveries and network failure honestly", async () => {
    for (const deliver of [
      vi.fn().mockResolvedValue(new Response("", { status: 500 })),
      vi.fn().mockRejectedValue(new Error("network")),
    ])
      expect(
        (await processDemo(valid, config, new MemoryLimiter(), "ip", deliver))
          .status,
      ).toBe("error");
  });
  it("rejects when rate limit or limiter service fails", async () => {
    const deliver = vi.fn();
    for (const limiter of [
      { allow: async () => false },
      {
        allow: async () => {
          throw Error("down");
        },
      },
    ])
      expect(
        (await processDemo(valid, config, limiter, "ip", deliver)).status,
      ).toBe("error");
    expect(deliver).not.toHaveBeenCalled();
  });
});
describe("rate limiting", () => {
  it("limits repeated and concurrent attempts and expires windows", async () => {
    let now = 0;
    const limiter = new MemoryLimiter(() => now);
    expect(
      (
        await Promise.all(
          Array.from({ length: 8 }, () => limiter.allow(["same"])),
        )
      ).filter(Boolean),
    ).toHaveLength(5);
    now = 901000;
    expect(await limiter.allow(["same"])).toBe(true);
  });
  it("does not trust arbitrary forwarded IP addresses", () => {
    expect(
      trustedAddress(new Headers({ "x-forwarded-for": "fake" }), undefined),
    ).toBe("unknown");
    expect(
      trustedAddress(new Headers({ "x-real-ip": "127.0.0.1" }), "nginx"),
    ).toBe("127.0.0.1");
    expect(trustedAddress(new Headers({ "x-real-ip": "fake" }), "nginx")).toBe(
      "unknown",
    );
  });
  it("hashes personal data and keeps IP rate independent from email", () => {
    const first = rateKeys("secret", "ip", "a@example.com");
    const second = rateKeys("secret", "ip", "b@example.com");
    expect(first[0]).toBe(second[0]);
    expect(first[1]).not.toBe(second[1]);
    expect(first.join()).not.toContain("@");
  });
  it("uses atomic Redis script and rejects malformed responses", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ result: 1 })));
    expect(
      await new RedisLimiter(
        "https://redis.example.com",
        "token",
        fetcher,
      ).allow(["a", "b"]),
    ).toBe(true);
    expect(JSON.parse(fetcher.mock.calls[0][1].body)[0]).toBe("EVAL");
    const bad = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ result: null })));
    await expect(
      new RedisLimiter("https://redis.example.com", "token", bad).allow(["a"]),
    ).rejects.toThrow();
  });
});

vi.mock("next/headers", () => ({ headers: async () => new Headers() }));
describe("server action integration", () => {
  it("returns a visible unconfigured response without delivery", async () => {
    const { submitDemo } = await import("../app/actions/demo");
    vi.stubEnv("DEMO_WEBHOOK_URL", "");
    expect((await submitDemo({ status: "idle" }, new FormData())).status).toBe(
      "error",
    );
    vi.unstubAllEnvs();
  });
  it("validates and forwards a configured form through the action", async () => {
    const { submitDemo } = await import("../app/actions/demo");
    vi.stubEnv("DEMO_WEBHOOK_URL", config.webhook);
    vi.stubEnv("DEMO_WEBHOOK_TOKEN", config.token);
    vi.stubEnv("PUBLISHER_NAME", config.publisher);
    vi.stubEnv("DEMO_LEGAL_READY", "true");
    vi.stubEnv("DEMO_RATE_SECRET", config.rateSecret);
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("DEMO_REDIS_REST_URL", "");
    vi.stubEnv("DEMO_REDIS_REST_TOKEN", "");
    const delivery = vi
      .fn()
      .mockResolvedValue(new Response("", { status: 202 }));
    vi.stubGlobal("fetch", delivery);
    const form = new FormData();
    Object.entries(valid).forEach(([key, value]) => form.set(key, value));
    try {
      expect((await submitDemo({ status: "idle" }, form)).status).toBe(
        "success",
      );
      expect(delivery).toHaveBeenCalledOnce();
    } finally {
      vi.unstubAllEnvs();
      vi.unstubAllGlobals();
    }
  });
});

describe("demo retry identity", () => {
  it("reuses the key for identical retries and renews it for changed submitted data", async () => {
    const { submissionIdentity } =
      await import("../lib/demo/submission-identity");
    const form = new FormData();
    form.set("email", "ada@example.com");
    form.set("topic", "First");
    const createId = vi
      .fn()
      .mockReturnValueOnce("first-id")
      .mockReturnValueOnce("changed-id");
    const first = await submissionIdentity(form, undefined, createId);
    form.set("requestId", "ignored-existing-key");
    expect(await submissionIdentity(form, first, createId)).toEqual(first);
    form.set("topic", "Edited");
    expect((await submissionIdentity(form, first, createId)).requestId).toBe(
      "changed-id",
    );
    expect(createId).toHaveBeenCalledTimes(2);
    expect(first.fingerprint).not.toContain("ada@example.com");
  });
});
