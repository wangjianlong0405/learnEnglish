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

  test("placement assessment provides listen controls", async ({ page }) => {
    await page.goto("/");
    await page.locator('[data-start-assessment]').first().click();
    await expect(page.locator("#assessment.is-active")).toBeVisible();
    await expect(page.locator("[data-speak-assessment-question]")).toBeVisible();
    await expect(page.locator("[data-assessment-voice-auto]")).toBeChecked();
    await expect(page.locator(".assessment-title .voice-chip")).toBeVisible();
    await expect(page.locator(`[data-quiz-placement-answer]`)).toHaveCount(4);
  });

  test("course pack saves and restores its output draft", async ({ page }) => {
    const draft = "Hi, I am Alex. I like reading.";
    await page.goto("/#lessons");
    await page.locator('[data-course-title="在咖啡店点单"]').click();
    await expect(page.locator("#course-pack")).toBeVisible();
    await page.locator('[data-pack-answer="1"]').click();
    await page.locator("[data-next-pack]").click();
    await page.locator('[data-pack-answer="0"]').click();
    await page.locator("[data-next-pack]").click();
    await page.locator('[data-pack-answer="1"]').click();
    await page.locator("#course-pack-output").fill(draft);
    await page.locator("[data-save-pack-output]").click();
    await page.locator("[data-close-course-pack]").click();
    await page.locator('[data-course-title="在咖啡店点单"]').click();
    await expect(page.locator("#course-pack-output")).toHaveValue(draft);
  });

  test("kids theme unit runs through practice and saves completion", async ({ page }) => {
    await page.goto("/#learning");
    await expect(page.locator("#kids-course-path")).toBeVisible();
    await expect(page.locator("[data-kids-unit]")).toHaveCount(12);
    await expect(page.locator("#kids-course-release")).toHaveText("先行单元 12 / 12");

    await page.locator('[data-kids-unit="hello-friends"]').click();
    await expect(page.locator("#kids-unit-workspace")).toBeVisible();
    await expect(page.locator(".kids-unit-lesson")).toHaveCount(5);

    for (const answer of [2, 0, 3, 1, 2]) {
      await page.locator(`[data-kids-unit-answer="${answer}"]`).click();
      await page.locator("[data-next-kids-question]").click();
    }

    await page.locator("[data-confirm-kids-output]").check();
    await page.locator("[data-complete-kids-unit]").click();
    await expect(page.locator(".kids-unit-card").first()).toHaveClass(/is-complete/);
    await expect.poll(() => page.evaluate(() => localStorage.getItem("linguaCompletedLessons"))).toContain("kids-unit:hello-friends");

    await page.locator('[data-kids-unit="my-body"]').click();
    await expect(page.locator("#kids-unit-workspace h2")).toContainText("My Body");
    await expect(page.locator(".kids-unit-lesson")).toHaveCount(5);

    await page.locator('[data-kids-unit="animals"]').click();
    await expect(page.locator("#kids-unit-workspace h2")).toContainText("Animals");
    await expect(page.locator(".kids-unit-lesson")).toHaveCount(5);

    await page.locator('[data-kids-unit="my-home"]').click();
    await expect(page.locator("#kids-unit-workspace h2")).toContainText("My Home");
    await expect(page.locator(".kids-unit-lesson")).toHaveCount(5);

    await page.locator('[data-kids-unit="clothes-weather"]').click();
    await expect(page.locator("#kids-unit-workspace h2")).toContainText("Clothes & Weather");
    await expect(page.locator(".kids-unit-lesson")).toHaveCount(5);
  });

  test("preschool track can be completed by listening and tapping pictures", async ({ page }) => {
    await page.goto("/");
    await page.locator('[data-open-age="preschool"]').click();
    await expect(page.locator("#learning.is-active")).toBeVisible({ timeout: 1500 });
    await expect(page.locator("#preschool-course-path")).toBeVisible({ timeout: 1500 });
    await expect(page.locator(".preschool-unit-card")).toHaveCount(15);
    await expect(page.locator(".learning-toolbar")).toBeHidden();

    await page.locator('[data-view="home"]').click();
    await expect(page.locator(".assessment-link")).toBeHidden();
    await expect(page.locator(".profile-chip [data-start-assessment]")).toBeHidden();
    await expect(page.locator("#personal-path-action")).toHaveText("进入幼儿课堂");
    await page.locator("#personal-path-action").click();
    await expect(page.locator("#preschool-course-path")).toBeVisible();

    await page.locator('[data-preschool-unit="animals"]').click();
    await expect(page.locator(".preschool-warmup button")).toHaveCount(6);
    await page.locator('[data-preschool-mode="listen"]').click();
    await expect(page.locator(".preschool-options button")).toHaveCount(3);

    for (const [index, answer] of ["cat", "dog", "rabbit", "bird", "fish", "duck"].entries()) {
      await page.locator(`[data-preschool-answer="${answer}"]`).click();
      if (index < 5) await expect(page.locator(".preschool-game-progress span").nth(index + 1)).toHaveClass(/is-current/, { timeout: 2500 });
    }

    await expect(page.locator(".preschool-finish")).toBeVisible({ timeout: 3000 });
    await expect.poll(() => page.evaluate(() => localStorage.getItem("linguaCompletedLessons"))).toContain("preschool:animals");
  });

  test("adult pathway provides four units and opens a real-task course", async ({ page }) => {
    await page.goto("/#learning");
    await page.locator('[data-age="adults"]').click();
    await page.locator('[data-view="lessons"]').click();

    await expect(page.locator("#adult-course-path")).toBeVisible();
    await expect(page.locator(".adult-unit-card")).toHaveCount(4);
    await expect(page.locator("[data-adult-course-title]")).toHaveCount(20);
    await expect(page.locator(".adult-unit-task")).toHaveCount(4);

    await page.locator('[data-adult-course-title="处理简单服务问题"]').click();
    await expect(page.locator("#course-pack h2")).toContainText("处理简单服务问题");
    await expect(page.locator("#course-pack")).toContainText("真实听说任务");
  });
});
