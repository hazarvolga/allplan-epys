import { test, expect } from "@playwright/test";
import { spawn, type ChildProcess } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
let server: ChildProcess;
let directory: string;
let logPath: string;
let origin: string;
let serverOutput = "";
test.beforeAll(async ({}, testInfo) => {
  directory = await mkdtemp(path.join(tmpdir(), "allplan-demo-e2e-"));
  logPath = path.join(directory, "synthetic-deliveries.jsonl");
  const port = testInfo.project.name === "desktop" ? 3101 : 3102;
  origin = `http://127.0.0.1:${port}`;
  server = spawn(
    process.execPath,
    [
      "--import",
      path.resolve("tests/fixtures/demo-fetch.mjs"),
      path.resolve("node_modules/next/dist/bin/next"),
      "start",
      "--hostname",
      "127.0.0.1",
      "--port",
      String(port),
    ],
    {
      cwd: process.cwd(),
      env: {
        PATH: process.env.PATH,
        HOME: process.env.HOME,
        TMPDIR: process.env.TMPDIR,
        NODE_ENV: "production",
        NEXT_TELEMETRY_DISABLED: "1",
        DEMO_WEBHOOK_URL: "https://delivery.invalid/demo",
        DEMO_WEBHOOK_TOKEN: "fake-test-delivery-token",
        DEMO_REDIS_REST_URL: "https://redis.invalid/rate",
        DEMO_REDIS_REST_TOKEN: "fake-test-redis-token",
        DEMO_LEGAL_READY: "true",
        PUBLISHER_NAME: "Aluplan",
        DEMO_RATE_SECRET: "fake-test-rate-secret-at-least-32-bytes-only",
        DEMO_FIXTURE_LOG: logPath,
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  server.stdout?.on("data", (chunk) => {
    serverOutput += chunk.toString();
  });
  server.stderr?.on("data", (chunk) => {
    serverOutput += chunk.toString();
  });
  await expect
    .poll(
      async () => {
        if (server.exitCode !== null)
          throw Error(`Fixture server exited: ${serverOutput}`);
        try {
          return (await fetch(`${origin}/tr/demo`)).status;
        } catch {
          return 0;
        }
      },
      { timeout: 20000, message: "Isolated demo fixture must start" },
    )
    .toBe(200);
});
test.afterAll(async () => {
  if (server && server.exitCode === null) {
    await new Promise<void>((resolve) => {
      const timer = setTimeout(() => {
        server.kill("SIGKILL");
        resolve();
      }, 5000);
      server.once("exit", () => {
        clearTimeout(timer);
        resolve();
      });
      server.kill("SIGTERM");
    });
  }
  if (directory) await rm(directory, { recursive: true, force: true });
});
test("mocked delivery failure retains input; unchanged retry reuses identity; edited retry succeeds and locks", async ({
  page,
}, testInfo) => {
  await page.route("**/*", async (route) => {
    const hostname = new URL(route.request().url()).hostname;
    if (["127.0.0.1", "localhost", "[::1]"].includes(hostname)) {
      await route.continue();
    } else {
      await route.abort("blockedbyclient");
    }
  });
  await page.goto(`${origin}/tr/demo`);
  const values = {
    name: "Synthetic E2E User",
    email: "synthetic@example.invalid",
    company: "Synthetic Office",
    discipline: "Mimarlık",
    software: "ALLPLAN",
    projectType: "Konut",
    phone: "0000000000",
    topic: "test-failure synthetic request",
  };
  for (const [name, value] of Object.entries(values))
    await page.locator(`[name="${name}"]`).fill(value);
  await page.locator("#demo-consent").check();
  const submit = page.getByRole("button", { name: "Demo talebimi gönder" });
  const state = page.getByRole("status");
  await expect(submit).toBeEnabled();
  await submit.click();
  await expect(state).toContainText("Talebiniz iletilemedi");
  for (const [name, value] of Object.entries(values))
    await expect(page.locator(`[name="${name}"]`)).toHaveValue(value);
  await expect(page.locator("#demo-consent")).toBeChecked();
  await expect(submit).toBeEnabled();
  const deliveries = async () => {
    try {
      return (await readFile(logPath, "utf8"))
        .trim()
        .split("\n")
        .map((line) => JSON.parse(line));
    } catch {
      return [];
    }
  };
  await expect.poll(async () => (await deliveries()).length).toBe(1);
  await submit.click();
  await expect.poll(async () => (await deliveries()).length).toBe(2);
  await expect(submit).toBeEnabled();
  const failures = await deliveries();
  expect(failures[0].idempotencyKey).toBe(failures[1].idempotencyKey);
  expect(failures.map((item) => item.status)).toEqual([503, 503]);
  await page.getByLabel("Görüşme konusu").fill("Synthetic corrected request");
  await submit.click();
  await expect(state).toContainText("Talebiniz alındı");
  await expect(submit).toBeDisabled();
  await expect(page.getByLabel("Ad soyad", { exact: true })).toBeDisabled();
  await expect.poll(async () => (await deliveries()).length).toBe(3);
  const captured = await deliveries();
  expect(captured[2].status).toBe(200);
  expect(captured[2].idempotencyKey).not.toBe(captured[0].idempotencyKey);
  expect(captured[2].data.topic).toBe("Synthetic corrected request");
  expect(captured[2].data.consent).toBe(true);
  await testInfo.attach("synthetic-deliveries", {
    body: JSON.stringify(captured, null, 2),
    contentType: "application/json",
  });
  await page.screenshot({
    path: `outputs/verification/${testInfo.project.name}-demo-mocked-success.png`,
    fullPage: true,
  });
});
