# Defect Report Template

## Defect Summary
- **Defect ID:** DEF-YYYYMMDD-XXX
- **Title:** [Brief, clear description of the defect]
- **Module:** [Authentication / Slot Booking / Dashboard / Admin / Navigation]
- **Reported By:** Poosala Saiteja
- **Date Reported:** YYYY-MM-DD
- **Environment:** Production (GitHub Pages) / Staging
- **Browser & OS:** Chrome 120+ / macOS / Windows / Mobile

---

## Classification
- **Severity:** Critical / High / Medium / Low
  - *Critical:* System crash, data loss, security compromise, blocked core flow with no workaround.
  - *High:* Major feature failure, core workflow impaired, workaround difficult.
  - *Medium:* Non-critical functionality broken, cosmetic with functional impact, workaround available.
  - *Low:* Minor cosmetic issue, typo, minor alignment, negligible impact.
- **Priority:** P0 (Blocker) / P1 (Urgent) / P2 (Normal) / P3 (Low)
- **Status:** New / Open / Under Investigation / In Progress / Fixed / Retest / Closed / Deferred / Rejected
- **Requirement Reference:** FR-XXX / REQ-XXX

---

## Pre-conditions
- Pre-requisite state (e.g., User is logged in as `user@test.com`, parking slot is available, etc.)

---

## Steps to Reproduce
1. Navigate to `https://saiteja-23-p.github.io/smart-parking-system/#/`
2. Go to [specific page/module]
3. Enter [specific test data]
4. Click [specific button/element]
5. Observe the behavior

---

## Expected Result
[Clear statement of what should happen according to functional specifications]

## Actual Result
[Clear statement of what actually happened, error messages received, or unexpected behavior]

---

## Visual Evidence / Attachments
- Screenshot: `screenshots/defects/DEF-XXX.png`
- Console Log / Network Trace: [Attach error log snippet or HAR file]

---

## Root Cause Analysis (RCA)
- Suspected component: (Frontend validation / Client-side router / Mock JWT auth / State store)
- Impact assessment: (Affects new users / all users / edge cases only)

---

## Retesting & Verification Log
| Date | Tester | Build/Version | Result | Comments |
|---|---|---|---|---|
| YYYY-MM-DD | Poosala Saiteja | v1.0.1 | Pass / Fail | Verified fix in staging |
