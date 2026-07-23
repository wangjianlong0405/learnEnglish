import assert from "node:assert/strict";
import { applySrsResult, SRS_FAIL_RETRY_MS, SRS_INTERVALS_DAYS } from "../js/srs.js";
import { recommendPlacementLevel } from "../data/assessment.js";

function testSrsSuccessLadder() {
  const item = { stage: 0 };
  const t0 = Date.now();
  const first = applySrsResult(item, true);
  assert.equal(first.intervalDays, SRS_INTERVALS_DAYS[0]);
  assert.equal(first.failRetry, false);
  assert.equal(item.stage, 1);
  assert.ok(item.nextReview >= t0 + SRS_INTERVALS_DAYS[0] * 86400000 - 50);

  const atMax = { stage: SRS_INTERVALS_DAYS.length - 1 };
  const capped = applySrsResult(atMax, true);
  assert.equal(capped.intervalDays, SRS_INTERVALS_DAYS.at(-1));
  assert.equal(atMax.stage, SRS_INTERVALS_DAYS.length - 1);
}

function testSrsFailureRetry() {
  const item = { stage: 3 };
  const t0 = Date.now();
  const result = applySrsResult(item, false);
  assert.equal(result.failRetry, true);
  assert.equal(result.intervalDays, 0);
  assert.equal(item.stage, 0);
  assert.ok(item.nextReview >= t0 + SRS_FAIL_RETRY_MS - 50);
  assert.ok(item.nextReview <= t0 + SRS_FAIL_RETRY_MS + 50);
}

function testSrsLegacyStage() {
  const item = { stage: -1 };
  applySrsResult(item, true);
  assert.equal(item.stage, 1);
}

function testPlacementMapping() {
  assert.equal(recommendPlacementLevel(0, 12), "Pre-A1");
  assert.equal(recommendPlacementLevel(2, 12), "Pre-A1");
  assert.equal(recommendPlacementLevel(3, 12), "A1");
  assert.equal(recommendPlacementLevel(5, 12), "A2");
  assert.equal(recommendPlacementLevel(8, 12), "B1");
  assert.equal(recommendPlacementLevel(10, 12), "B2");
  assert.equal(recommendPlacementLevel(12, 12), "B2");
}

testSrsSuccessLadder();
testSrsFailureRetry();
testSrsLegacyStage();
testPlacementMapping();

console.log("Core logic tests passed (SRS + placement mapping).");
