import assert from "node:assert/strict";
import { applySrsResult, SRS_FAIL_RETRY_MS, SRS_INTERVALS_DAYS } from "../js/srs.js";
import { recommendPlacementLevel } from "../data/assessment.js";
import { BACKUP_VERSION } from "../js/persist.js";
import { validateBackupPayload } from "../js/backup.js";

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

function testBackupValidation() {
  assert.equal(validateBackupPayload(null).ok, false);
  assert.equal(validateBackupPayload({ app: "other", data: {} }).ok, false);
  assert.equal(validateBackupPayload({ app: "lingua-english", data: {} }).ok, false);

  const current = validateBackupPayload({
    app: "lingua-english",
    version: BACKUP_VERSION,
    data: { linguaLevel: "A2" },
  });
  assert.equal(current.ok, true);
  assert.equal(current.warning, "");
  assert.equal(current.entries.length, 1);

  const older = validateBackupPayload({
    app: "lingua-english",
    version: 0,
    data: { linguaLevel: "A1" },
  });
  assert.equal(older.ok, true);
  assert.match(older.warning, /旧版备份/);

  const newer = validateBackupPayload({
    app: "lingua-english",
    version: BACKUP_VERSION + 1,
    data: { linguaLevel: "B1" },
  });
  assert.equal(newer.ok, true);
  assert.match(newer.warning, /更新版本/);

  const missingVersion = validateBackupPayload({
    app: "lingua-english",
    data: { linguaLevel: "A2" },
  });
  assert.equal(missingVersion.ok, true);
  assert.match(missingVersion.warning, /缺少版本号/);
}

testSrsSuccessLadder();
testSrsFailureRetry();
testSrsLegacyStage();
testPlacementMapping();
testBackupValidation();

console.log("Core logic tests passed (SRS + placement mapping + backup validation).");
