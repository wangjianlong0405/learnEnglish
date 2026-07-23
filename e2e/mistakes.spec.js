import { test, expect } from "@playwright/test";

const sampleMistake = {
  id: "e2e-mistake-1",
  source: "E2E",
  question: "Pick the natural greeting.",
  options: ["Hello!", "Goodbye forever.", "Table chair.", "Sleep now."],
  answer: 0,
  note: "Hello is a common greeting.",
  attempts: 1,
  stage: 0,
  nextReview: 0,
};

test("mistake review updates storage and weekly log", async ({ page }) => {
  await page.addInitScript((mistake) => {
    localStorage.setItem("linguaMistakes", JSON.stringify([mistake]));
    localStorage.removeItem("linguaWeekLog");
    localStorage.removeItem("linguaLearningDays");
  }, sampleMistake);

  await page.goto("/#practice");
  await page.locator('[data-practice-mode="review"]').click();
  await expect(page.locator("#mistake-count-badge")).toHaveText("1");
  await page.locator('[data-review-id="e2e-mistake-1"]').click();
  await page.locator('[data-review-answer="0"]').click();

  const weekLog = await page.evaluate(() => JSON.parse(localStorage.getItem("linguaWeekLog") || "{}"));
  const total = Object.values(weekLog).reduce((sum, value) => sum + (Number(value) || 0), 0);
  expect(total).toBeGreaterThanOrEqual(1);

  const mistakes = await page.evaluate(() => JSON.parse(localStorage.getItem("linguaMistakes") || "[]"));
  expect(mistakes[0]?.stage).toBeGreaterThanOrEqual(1);
});

test("daily quiz wrong answer increases mistake badge", async ({ page }) => {
  await page.goto("/#practice");
  await expect(page.locator("#quiz-content .quiz-option")).toHaveCount(4);

  await page.locator('[data-quiz-daily-answer="3"]').click();
  await page.locator("#quiz-feedback [data-quiz-next]").click();

  await page.locator('[data-practice-mode="review"]').click();
  await expect(page.locator("#mistake-count-badge")).not.toHaveText("0");
});
