# QA METRICS
## Smart Parking System — Quality Assurance

| Field | Value |
|---|---|
| Author | Poosala Saiteja |
| Date | 2026-10-29 |

---

## Formulas

| Metric | Formula |
|---|---|
| Pass Rate | (Passed / Executed) × 100 |
| Fail Rate | (Failed / Executed) × 100 |
| Execution Rate | (Executed / Total Designed) × 100 |
| Requirement Coverage | (Requirements with TCs / Total Requirements) × 100 |
| Automation Coverage | (Automated TCs / Total Designed TCs) × 100 |
| Defect Density | (Defects Found / Test Cases Executed) |

---

## Test Design Metrics

| Category | Count |
|---|---|
| Functional Test Cases | 45 |
| Negative Test Cases | 20 |
| Boundary Test Cases | 20 |
| Security Test Cases | 15 |
| Smoke Test Cases | 10 |
| Regression Test Cases | 12 |
| UI/Responsive/Accessibility | 5 |
| **Total Test Cases Designed** | **127** |

---

## Requirement Coverage

| Metric | Value |
|---|---|
| Total Functional Requirements | 15 |
| Requirements with Test Cases | 15 |
| **Requirement Coverage** | **100%** |

---

## Automation Metrics

| Metric | Value |
|---|---|
| Total Test Cases | 127 |
| Automated Test Cases | 25 (Playwright specs) |
| **Automation Coverage** | **19.7%** |
| Target Automation Coverage | 30% (critical paths) |
| Automated Test Files | 5 (smoke, auth, booking, security, responsive) |
| Page Object Classes | 3 (LoginPage, BookingPage, DashboardPage) |
| Utility Modules | 1 (auth.helper.js) |

---

## Execution Metrics (Automation Execution)

> **Execution Environment:** Chromium (Headless) | Node.js v20 | Playwright Test Runner  
> **Duration:** 1.2 minutes | **HTML Report:** `automation/reports/html-report`

| Suite | Total | Executed | Passed | Failed | Blocked | Skipped | Pass Rate (Executed) |
|---|---|---|---|---|---|---|---|
| Smoke (`smoke.test.js`) | 8 | 8 | 8 | 0 | 0 | 0 | **100.0%** |
| Auth (`auth.test.js`) | 11 | 11 | 10 | 1 (`TC-012`) | 0 | 0 | **90.9%** |
| Security (`security.test.js`) | 8 | 7 | 6 | 1 (`SEC-015`) | 0 | 1 (`SEC-010`) | **85.7%** |
| Responsive (`responsive.test.js`) | 10 | 10 | 10 | 0 | 0 | 0 | **100.0%** |
| Booking (`booking.test.js`) | 5 | 0 | 0 | 0 | 0 | 5 | Skipped (Dynamic UI) |
| **TOTAL AUTOMATED** | **42** | **36** | **34** | **2** | **0** | **6** | **94.4%** |

---

## Defect Metrics (Confirmed via Execution)

| Severity | Count | % of Total | Defect ID |
|---|---|---|---|
| Critical | 0 | 0% | — |
| High | 1 | 50% | `DEF-001` (Arbitrary password accepted on user login) |
| Medium | 1 | 50% | `DEF-002` (Browser back button displays cached dashboard) |
| Low | 0 | 0% | — |
| **Total** | **2** | **100%** | |

**Defect Density:** 2 defects / 36 executed tests = **0.056 defects/test** (5.6%)  
**Execution Pass Rate:** 34 passed / 36 executed = **94.4%**  
**Evidence:** Screenshots stored in `screenshots/defects/`

---

## Testing Scope Coverage

| Module | Test Cases | Covered |
|---|---|---|
| Landing Page | 5 | ✅ |
| Login | 18 | ✅ |
| Registration | 9 | ✅ |
| Parking Discovery | 4 | ✅ |
| Slot Selection | 7 | ✅ |
| Booking Form | 25 | ✅ |
| Booking Confirmation | 5 | ✅ |
| Dashboard | 8 | ✅ |
| Admin Panel | 11 | ✅ |
| Logout | 5 | ✅ |
| Navigation | 5 | ✅ |
| Security | 15 | ✅ |
| Responsive | 3 | ✅ |
| Accessibility | 2 | ✅ |
