import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 2,
  timeout: 45000,
  reporter: [
    ["list"],
    [
      "html",
      { outputFolder: "outputs/verification/playwright-report", open: "never" },
    ],
    ["junit", { outputFile: "outputs/verification/junit.xml" }],
  ],
  outputDir: "outputs/verification/test-results",
  use: {
    baseURL: process.env.BASE_URL || "http://127.0.0.1:3100",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    {
      name: "mobile-360",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 360, height: 800 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
});
