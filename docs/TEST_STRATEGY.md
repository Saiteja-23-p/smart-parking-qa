# TEST STRATEGY
## Smart Parking System — Quality Assurance

| Field | Value |
|---|---|
| Version | 1.0 |
| Author | Poosala Saiteja |
| Date | 2026-10-29 |

---

## 1. Overview

This document defines the **testing approach, techniques, tools, and priorities** for QA of the Smart Parking System. The strategy is risk-based, prioritizing the most critical user flows and business logic, while acknowledging the client-side-only architecture of the deployed application.

---

## 2. Functional Testing Strategy

**Approach:** Black-Box testing from the end-user perspective.

**Why:** Source code is minified; the application is tested as a product (what it does, not how).

**Method:**
- Identify each functional module from the application analysis
- Map requirements to test scenarios
- Execute positive (happy path) and negative scenarios for each module
- Verify UI feedback (error messages, confirmations, redirects)

**Priority Order:**
1. Authentication (login/register) — gateway to all other flows
2. Slot selection and booking — core business flow
3. Dashboard and history — user value delivery
4. Admin panel — high-risk, role-sensitive

---

## 3. UI Testing Strategy

**Approach:** Visual inspection + automated layout assertions.

**Why:** React SPA with Tailwind CSS; UI regressions can occur across component updates.

**Checks:**
- Page title and headings render correctly
- Navigation bar is present and links are functional
- Buttons have correct labels
- Forms have visible labels and placeholders
- Error messages appear in the correct context
- No broken images or icons
- Footer content present

**Tools:** Manual review + Playwright screenshot assertions

---

## 4. Regression Testing Strategy

**Approach:** Maintain a suite of stable automated tests covering critical paths.

**Why:** SPA architecture means a change in one component can silently break another route.

**Scope:**
- All P0 smoke tests
- All P1 functional tests for Login, Booking, Dashboard
- Admin access control

**Trigger:** Run on every code change (CI/CD) and before any release.

**Priority Levels:**
- P0 — Critical (smoke): must pass 100%
- P1 — High: must pass ≥ 95%
- P2 — Medium: must pass ≥ 85%

---

## 5. Smoke Testing Strategy

**Approach:** Minimal critical path verification before full testing begins.

**Why:** Detect showstopper defects early; avoid wasting effort on a broken build.

**Scope:** 8–10 tests covering: load, login, navigation, slot display, booking start.

**Duration:** Should complete in < 5 minutes.

**Automation:** Fully automated in CI/CD pipeline.

---

## 6. Sanity Testing Strategy

**Approach:** Focused re-verification of a specific module after a bug fix or change.

**Why:** Faster than full regression; confirms that the fix works without breaking neighbors.

**When:** After each defect fix or module update.

**Scope:** Limited to the changed module + one upstream/downstream integration point.

---

## 7. Negative Testing Strategy

**Approach:** Attempt to break the application with invalid, empty, malformed, and unexpected inputs.

**Why:** Applications often fail on edge cases; negative testing prevents poor UX and security risks.

**Techniques:**
- Empty required fields
- Invalid email formats
- SQL injection strings in text fields
- XSS payloads in vehicle number
- Excessively long input strings
- Special characters
- Numeric input in text fields
- Past dates in date pickers
- Decimal values in integer fields

---

## 8. Boundary Value Analysis (BVA) Strategy

**Approach:** Test at and around the boundaries of valid input ranges.

**Why:** Defects cluster at the edges of allowed ranges.

**Applied To:**
- Vehicle number length (discovered validation: "Please provide a vehicle license number")
- Duration in hours (parking duration field)
- Password length (login/register)
- Email length

**BVA Pattern:**
```
min-1 | min | min+1 | ... | max-1 | max | max+1
```

---

## 9. Equivalence Partitioning (EP) Strategy

**Approach:** Divide input space into equivalence classes; test one value from each class.

**Applied To Vehicle Number Field:**

| Class | Example | Expected |
|---|---|---|
| Valid alphanumeric | `KA01AB1234` | Accepted |
| Empty string | `` | Rejected — required error |
| Spaces only | `     ` | Rejected |
| Special chars | `@#$!` | Rejected |
| Too long | `AAAAAAAAAAAAAAAA` | Rejected or truncated |
| Lowercase | `ka01ab1234` | Accepted or normalized |

---

## 10. Exploratory Testing Strategy

**Approach:** Unscripted time-boxed exploration of the application.

**Why:** Discovers defects that scripted tests miss; good for assessing overall product quality.

**Sessions:**
- Session 1 (30 min): Authentication module — try unusual login patterns
- Session 2 (30 min): Booking flow — try invalid combinations, refresh mid-flow
- Session 3 (20 min): Admin panel — access control, slot manipulation
- Session 4 (20 min): Navigation — URL manipulation, back button behavior

**Charters (focus areas):**
- "Explore what happens when a user bookmarks a dashboard URL and opens it without authentication"
- "Explore booking form behavior when changing location after entering vehicle data"

---

## 11. Security Testing Strategy

**Approach:** Non-destructive, UI-layer security checks only (no penetration testing).

**Why:** Authentication, session management, and input validation are common vulnerability areas.

**Tests:**
1. Direct URL access to `/dashboard` without login → should redirect to login
2. Direct URL access to `/admin` without login → should redirect to login
3. Direct URL access to `/admin` as regular user → should reject
4. XSS payload in vehicle number field
5. Long string injection in all text fields
6. localStorage token manipulation (manual)
7. Password masking in login form
8. Sensitive data in page source

> ⚠️ **No destructive tests will be performed. No automated scanning tools against GitHub Pages infrastructure.**

---

## 12. Accessibility Testing Strategy

**Approach:** Manual keyboard navigation + automated axe-core checks via Playwright.

**Standard:** WCAG 2.1 Level AA (basic checks)

**Checks:**
- All interactive elements reachable by keyboard (Tab)
- Form inputs have associated `<label>` elements
- Buttons have accessible names
- Images have alt text
- Color contrast meets 4.5:1 ratio
- Focus indicator visible
- Heading hierarchy (h1 → h2 → h3)
- Error messages linked to form fields

---

## 13. Responsive Testing Strategy

**Approach:** Multi-viewport testing via Playwright `page.setViewportSize()`.

**Viewports:**

| Name | Width | Height |
|---|---|---|
| Mobile S | 375 | 667 |
| Mobile L (iPhone 14) | 390 | 844 |
| Tablet | 768 | 1024 |
| Laptop | 1366 | 768 |
| Desktop | 1920 | 1080 |

**Checks per viewport:**
- Navigation collapses/expands correctly
- Slot grid reflows properly
- Booking form is usable
- No horizontal overflow
- Buttons and links remain clickable

---

## 14. API Testing Strategy

**Situation:** The deployed application uses client-side sandbox mode. No live API endpoints are externally accessible.

**Strategy:**
1. Document how API testing *would* be performed if a backend existed
2. Create a Postman collection with expected endpoint contracts (based on application behavior)
3. Prepare environment variables for when a real backend becomes available
4. Include API schema validation and assertion templates

**Documented Limitation:** API testing cannot be executed against the current deployment.

---

## 15. Cross-Browser Testing Strategy

**Primary browser:** Chrome (automated + manual)  
**Secondary:** Firefox, Edge (automated via Playwright)  
**Tertiary:** Safari (manual only — Playwright Safari has limitations in CI)

**Focus:** Critical path (login, booking, dashboard) must pass on all primary browsers.

---

## 16. Automation Strategy

**Framework:** Playwright + JavaScript  
**Pattern:** Page Object Model (POM)  
**Why Playwright over Selenium:**
- Native async/await support (modern JS)
- Built-in auto-waiting (no manual `waitForElement` chains)
- Multi-browser from single API
- Built-in HTML reporter
- Faster execution than Selenium
- Better SPA support (React hash routing)

**Coverage Target:** Top 10 user flows automated  
**Selector Priority:** `data-testid` > `aria-label` > `role` > `text` > CSS class

**Structure:**
```
automation/
  pages/          ← Page Object classes
  tests/          ← Spec files
  utils/          ← Helpers (auth, data)
  config/         ← playwright.config.js
  reports/        ← HTML report output
```

**CI/CD:** GitHub Actions runs on every push to `main`

---

## 17. Risk-Based Testing Priority

| Feature | Risk | Test Priority |
|---|---|---|
| Login / Authentication | CRITICAL | P0 |
| Admin Role Enforcement | CRITICAL | P0 |
| Booking Form Validation | HIGH | P0 |
| Slot State Accuracy | HIGH | P1 |
| Dashboard / History | MEDIUM | P1 |
| Analytics (Admin) | LOW | P2 |
| Responsive Layout | MEDIUM | P2 |
| Accessibility | MEDIUM | P2 |
