import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { faqs } from "../../content/faq";
const slugs = [
  "",
  "dijital-proje-yonetmeligi",
  "allplan-ile-hazirlik",
  "allplan-revit-archicad",
  "ifc-pdfa-teslim-rehberi",
  "sik-sorulan-sorular",
  "kaynaklar",
  "demo",
  "bursa-dijital-proje",
];
test("home content order, scenario and persisted theme", async ({
  page,
}, testInfo) => {
  await page.goto("/tr");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Yeni dijital proje dönemine ALLPLAN ile hazırlanın.",
  );
  expect(
    await page
      .locator("main > section[id]")
      .evaluateAll((nodes) => nodes.map((n) => n.id)),
  ).toEqual([
    "change",
    "timeline",
    "benefits",
    "scenario",
    "comparison",
    "plan",
    "contact",
  ]);
  const steps = page
    .getByRole("group", { name: "Örnek iş akışı adımları" })
    .getByRole("button");
  await expect(steps).toHaveCount(6);
  for (let i = 0; i < 6; i++) {
    await steps.nth(i).click();
    await expect(steps.nth(i)).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".scenario-caption")).toContainText(
      `0${i + 1} /`,
    );
  }
  await page.getByRole("button", { name: "Koyu temaya geç" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.screenshot({
    path: `outputs/verification/${testInfo.project.name}-home-dark.png`,
    fullPage: true,
  });
  await page.getByRole("button", { name: "Açık temaya geç" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.screenshot({
    path: `outputs/verification/${testInfo.project.name}-home-light.png`,
    fullPage: true,
  });
});
test("navigation, keyboard menu trap, Escape and destination", async ({
  page,
}, testInfo) => {
  await page.goto("/tr");
  if (testInfo.project.name === "mobile-360") {
    const trigger = page.getByRole("button", { name: /Menü/ });
    await trigger.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    const links = dialog.getByRole("link");
    await links.last().focus();
    await page.keyboard.press("Tab");
    await expect(
      dialog.getByRole("button", { name: "Menüyü kapat" }),
    ).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(links.last()).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
    await trigger.click();
    await dialog.getByRole("link", { name: "Yeni düzenlemeler" }).click();
    await expect(dialog).not.toBeVisible();
  } else {
    await page
      .getByRole("navigation", { name: "Ana gezinme", exact: true })
      .getByRole("link", { name: "Yeni düzenlemeler" })
      .click();
  }
  await expect(page).toHaveURL(/dijital-proje-yonetmeligi$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const selector = page.getByLabel("İncelemek istediğiniz dönem");
  await selector.selectOption("pdf");
  await expect(page.locator("tr[data-highlight=true]")).toHaveCount(2);
  await selector.selectOption("ifc");
  await expect(page.locator("tr[data-highlight=true]")).toHaveCount(4);
  await selector.selectOption("all");
  await expect(page.locator("tr[data-highlight=true]")).toHaveCount(0);
});
test("all primary routes render without horizontal page overflow and expose sources", async ({
  page,
}) => {
  for (const slug of slugs) {
    await page.goto(`/tr/${slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      slug,
    ).toBe(true);
    const sources = page.locator(".source-references a");
    if (await sources.count()) {
      expect(await sources.first().getAttribute("href")).toMatch(/^https:\/\//);
      await expect(sources.first()).toHaveAttribute("target", "_blank");
    }
  }
});
test("unconfigured demo remains disabled with truthful explanation", async ({
  page,
}) => {
  await page.goto("/tr/demo");
  await expect(page.locator("#demo-unavailable")).toContainText(
    "tamamlandığında açılacaktır",
  );
  await expect(
    page.getByRole("button", { name: "Demo talebimi gönder" }),
  ).toBeDisabled();
  await expect(page.getByLabel("Ad soyad", { exact: true })).toBeDisabled();
});
test("FAQ structured data matches every visible answer exactly", async ({
  page,
}) => {
  await page.goto("/tr/sik-sorulan-sorular");
  const schemas = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  const faq = schemas
    .map((s) => JSON.parse(s))
    .flat()
    .find((s) => s["@type"] === "FAQPage");
  expect(faq.mainEntity).toHaveLength(faqs.length);
  for (const [i, f] of faqs.entries()) {
    const detail = page.locator(".faq-item").nth(i);
    await detail.locator("summary").click();
    await expect(detail.locator("summary")).toHaveText(f.question);
    const answer = await detail.locator("p").evaluate((p) =>
      Array.from(p.childNodes)
        .filter((n) => n.nodeType === Node.TEXT_NODE)
        .map((n) => n.textContent)
        .join("")
        .trim(),
    );
    expect(answer).toBe(f.answer);
    expect(faq.mainEntity[i].name).toBe(f.question);
    expect(faq.mainEntity[i].acceptedAnswer.text).toBe(answer);
  }
});
test("crawler endpoints, markdown, OG, Bursa noindex and 404", async ({
  request,
  page,
}) => {
  for (const path of [
    "/robots.txt",
    "/sitemap.xml",
    "/llms.txt",
    "/llms-full.txt",
    "/dijital-proje-yonetmeligi.md",
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    expect(await response.text()).not.toContain("undefined");
  }
  const md = await request.get("/dijital-proje-yonetmeligi.md");
  expect(md.headers()["content-type"]).toContain("text/markdown");
  expect(await md.text()).toContain("# ");
  await page.goto("/tr");
  const og = await page
    .locator('meta[property="og:image"]')
    .getAttribute("content");
  expect(og).toBeTruthy();
  const image = await request.get(og!);
  expect(image.ok()).toBe(true);
  expect(image.headers()["content-type"]).toContain("image/");
  await page.goto("/tr/bursa-dijital-proje");
  await expect(page.locator("meta[name=robots]")).toHaveAttribute(
    "content",
    /noindex/,
  );
  const missing = await request.get("/tr/this-route-does-not-exist");
  expect(missing.status()).toBe(404);
});
for (const theme of ["light", "dark"])
  for (const slug of [
    "",
    "dijital-proje-yonetmeligi",
    "allplan-revit-archicad",
    "demo",
  ])
    test(`WCAG AA ${theme} ${slug || "home"}`, async ({ page }) => {
      await page.addInitScript((t) => localStorage.setItem("theme", t), theme);
      await page.goto(`/tr/${slug}`);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      const scan = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      expect(scan.violations).toEqual([]);
    });
