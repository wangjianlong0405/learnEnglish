import { test, expect } from "@playwright/test";

test.describe("Lingua smoke", () => {
  test("home loads and sidebar hash routing works", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Lingua/);
    await expect(page.locator("#greeting-title")).toBeVisible();

    await page.locator('[data-view="words"]').click();
    await expect(page).toHaveURL(/#words$/);
    await expect(page.locator("#flashcard")).toBeVisible();
    await expect(page.locator("#words")).toHaveClass(/is-active/);

    await page.locator('[data-view="practice"]').click();
    await expect(page).toHaveURL(/#practice$/);
    await expect(page.locator("#quiz-content")).toBeVisible();
  });

  test("direct hash opens grammar view", async ({ page }) => {
    await page.goto("/#grammar");
    await expect(page.locator("#grammar")).toHaveClass(/is-active/);
    await expect(page.locator("#grammar-topic-list")).toBeVisible();
  });
});
