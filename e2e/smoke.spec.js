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

  test("direct hash opens phonetics chart with symbols", async ({ page }) => {
    await page.goto("/#phonetics");
    await expect(page.locator("#phonetics")).toHaveClass(/is-active/);
    await expect(page.locator("#phonetic-count")).toHaveText(/^[1-9]\d*$/);
    await expect(page.locator(".phonetic-tile").first()).toBeVisible();
    await expect(page.locator("#phonetic-detail .phonetic-symbol")).toBeVisible();
  });

  test("course pack saves and restores its output draft", async ({ page }) => {
    const draft = "Hi, I am Alex. I like reading.";
    await page.goto("/#lessons");
    await page.locator('[data-course-title="打招呼与自我介绍"]').click();
    await expect(page.locator("#course-pack")).toBeVisible();
    await page.locator('[data-pack-answer="0"]').click();
    await page.locator("[data-next-pack]").click();
    await page.locator('[data-pack-answer="1"]').click();
    await page.locator("[data-next-pack]").click();
    await page.locator('[data-pack-answer="1"]').click();
    await page.locator("#course-pack-output").fill(draft);
    await page.locator("[data-save-pack-output]").click();
    await page.locator("[data-close-course-pack]").click();
    await page.locator('[data-course-title="打招呼与自我介绍"]').click();
    await expect(page.locator("#course-pack-output")).toHaveValue(draft);
  });
});
