import { addDays } from "./utils.js";

/** Shared spaced-repetition ladder (days). */
export const SRS_INTERVALS_DAYS = [1, 3, 7, 14, 30];

/** After a failed review, retry soon in-session instead of waiting a full day. */
export const SRS_FAIL_RETRY_MS = 5 * 60 * 1000;

/**
 * Apply one review result onto a schedule item.
 * `stage` = consecutive successes completed (0 = learning / just failed).
 * Legacy word schedules may still carry stage -1; those are treated as 0.
 *
 * @returns {{ intervalDays: number, nextReview: number, failRetry: boolean }}
 */
export function applySrsResult(item, success) {
  let stage = Number.isFinite(item.stage) ? item.stage : 0;
  if (stage < 0) stage = 0;

  if (success) {
    const intervalDays = SRS_INTERVALS_DAYS[Math.min(stage, SRS_INTERVALS_DAYS.length - 1)];
    item.stage = Math.min(stage + 1, SRS_INTERVALS_DAYS.length - 1);
    item.nextReview = addDays(Date.now(), intervalDays);
    return { intervalDays, nextReview: item.nextReview, failRetry: false };
  }

  item.stage = 0;
  item.nextReview = Date.now() + SRS_FAIL_RETRY_MS;
  return { intervalDays: 0, nextReview: item.nextReview, failRetry: true };
}

export function isDue(item, now = Date.now()) {
  return !item || !Number.isFinite(item.nextReview) || item.nextReview <= now;
}

export function formatReviewTime(timestamp) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

export function formatReviewDay(timestamp) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "short",
    day: "numeric",
  }).format(new Date(timestamp));
}
