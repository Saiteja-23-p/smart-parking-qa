# TEST PLAN
## Smart Parking System — Software Quality Assurance

| Field | Value |
|---|---|
| Document Version | 1.0 |
| Author | Poosala Saiteja |
| Date | 2026-10-29 |
| Application | Smart Parking System |
| URL | https://saiteja-23-p.github.io/smart-parking-system/#/ |
| Status | APPROVED |

---

## 1. Introduction

This Test Plan defines the approach, scope, resources, and schedule for testing the **Smart Parking System** — a React-based Single Page Application (SPA) that allows users to discover, book, and manage parking slots at multiple locations across Hyderabad, India.

The application operates in **client-side sandbox mode** due to no live backend being accessible from the deployed URL. All tests reflect this constraint.

---

## 2. Objectives

1. Verify that all user-facing features work as described in the requirement catalog
2. Identify functional defects in login, slot selection, booking, dashboard, and admin modules
3. Validate form fields with valid, invalid, boundary, and edge-case data
4. Verify correct role-based access control (User vs Admin)
5. Validate navigation and routing behavior (hash routing on SPA)
6. Assess security at the UI layer (input validation, auth enforcement, URL manipulation)
7. Evaluate accessibility and responsive behavior
8. Build and execute automated regression suite for critical flows
9. Provide evidence-based test reporting

---

## 3. Scope

### 3.1 In Scope

| Module | Test Types |
|---|---|
| Landing Page | UI, Functional, Navigation |
| User Registration | Functional, Validation, Negative |
| User Login | Functional, Validation, Negative, Security |
| Admin Login | Functional, Role-based, Security |
| Parking Location Discovery | Functional, UI |
| Slot Availability Display | Functional, UI |
| Slot Selection | Functional, State Transition |
| Booking Form | Functional, Validation, Negative, Boundary |
| Booking Confirmation | Functional, UI |
| User Dashboard | Functional, UI |
| Booking History | Functional, UI |
| Admin Dashboard | Functional, Role-based |
| Admin Analytics | Functional, UI |
| Logout | Functional, Security |
| Navigation | Functional, URL Manipulation |
| Responsive Design | Mobile, Tablet, Desktop |
| Cross-Browser | Chrome, Firefox, Edge, Safari |
| Accessibility | WCAG 2.1 basic checks |
| Security (UI layer) | Input validation, auth bypass, XSS |

### 3.2 Out of Scope

- Real backend API testing (no live API accessible)
- Database validation (no DB access)
- Payment gateway testing (mock only)
- Performance/load testing (static hosting)
- Real RFID/Fastag/QR hardware
- Email notification delivery
- Native mobile app

---

## 4. Testing Types

| Type | Description | Priority |
|---|---|---|
| Smoke Testing | Critical path quick verification | P0 |
| Sanity Testing | Focused re-verification after changes | P0 |
| Functional Testing | Feature-by-feature validation | P1 |
| UI Testing | Visual accuracy, layout, components | P1 |
| Negative Testing | Invalid inputs, error paths | P1 |
| Boundary Value Analysis | Min/max field limits | P1 |
| Equivalence Partitioning | Valid/invalid input classes | P1 |
| Regression Testing | Ensure no existing functionality broken | P1 |
| Integration Testing | Module-to-module flows (login→dashboard) | P1 |
| Security Testing | Auth bypass, XSS, URL manipulation | P1 |
| Accessibility Testing | WCAG 2.1 Level AA checks | P2 |
| Responsive Testing | Multi-viewport testing | P2 |
| Cross-Browser Testing | Chrome, Firefox, Edge | P2 |
| Exploratory Testing | Unscripted discovery sessions | P2 |

---

## 5. Test Environment

| Property | Value |
|---|---|
| Application Type | Static SPA (React + Vite) |
| Hosting | GitHub Pages |
| URL | https://saiteja-23-p.github.io/smart-parking-system/#/ |
| Backend | Client-side sandbox (no live API) |
| Data Persistence | localStorage (browser session) |
| Test Execution | Playwright (automation) + Manual (exploratory) |
| OS | macOS / Windows |
| Node.js | ≥ 18.x (for Playwright) |
| Automation Language | JavaScript / Node.js |

---

## 6. Browser Matrix

| Browser | Version | Platform | Priority | Manual | Automated |
|---|---|---|---|---|---|
| Google Chrome | Latest | macOS/Windows | P0 | ✅ | ✅ |
| Mozilla Firefox | Latest | macOS/Windows | P1 | ✅ | ✅ |
| Microsoft Edge | Latest | Windows | P1 | ✅ | ✅ |
| Safari | Latest | macOS | P2 | ✅ | ⚠️ Limited |

---

## 7. Test Data

| Category | Source |
|---|---|
| Valid Users | `test-data/valid-users.csv` |
| Invalid Users | `test-data/invalid-users.csv` |
| Booking Data | `test-data/booking-data.csv` |
| Boundary Data | `test-data/boundary-data.csv` |
| Admin Credentials | Confirmed from bundle: `admin@smartparking.com` |

---

## 8. Entry Criteria

Before testing begins, the following must be satisfied:

- [ ] Application URL is accessible and loads without errors
- [ ] Login (user and admin) is functional in sandbox mode
- [ ] Automation environment set up (Node.js, Playwright installed)
- [ ] Test cases reviewed and approved
- [ ] Test data prepared
- [ ] Browser versions confirmed

---

## 9. Exit Criteria

Testing is considered complete when:

- [ ] All smoke test cases pass (100%)
- [ ] ≥ 90% of all functional test cases executed
- [ ] All P0/P1 defects resolved or accepted
- [ ] Automation suite runs with ≥ 85% pass rate
- [ ] No open Critical/High defects without workaround
- [ ] Test summary report created
- [ ] RTM shows ≥ 90% requirement coverage

---

## 10. Roles and Responsibilities

| Role | Person | Responsibility |
|---|---|---|
| QA Engineer | Poosala Saiteja | Test case design, execution, defect reporting |
| Test Automation Engineer | Poosala Saiteja | Framework setup, automation scripts |
| QA Lead | Poosala Saiteja | Test plan, strategy, sign-off |
| Developer (self-review) | Poosala Saiteja | Bug fix, retest support |

---

## 11. Risk and Mitigation

| Risk | Impact | Mitigation |
|---|---|---|
| No live backend | HIGH | Test all UI flows in sandbox mode; clearly document API limitation |
| Mock data resets on refresh | MEDIUM | Run each test in clean browser state; use localStorage setup scripts |
| Hash routing instability on refresh | MEDIUM | Document as known behavior; test navigation via UI clicks |
| Limited cross-browser automation support (Safari) | LOW | Safari tested manually; document limitation |
| Playwright selector instability | MEDIUM | Use data-testid > aria > role > text selectors in priority order |
| Application changes post-analysis | LOW | Re-inspect bundle before each major test run |

---

## 12. Defect Management Process

1. Defect discovered → documented in `defects/defect-report.csv`
2. Assigned Defect ID (DEF-XXX)
3. Severity assigned: **Critical / High / Medium / Low**
4. Priority assigned: **P0 / P1 / P2 / P3**
5. Status tracked: New → Assigned → Open → Fixed → Retest → Closed

**Defect Tracking Tool:** GitHub Issues + CSV (offline)

---

## 13. Automation Strategy

- **Framework:** Playwright (JavaScript)
- **Pattern:** Page Object Model (POM)
- **Coverage Target:** Critical flows (login, booking, dashboard, admin)
- **Reporting:** Playwright HTML Report + console output
- **CI/CD:** GitHub Actions workflow on push/PR

---

## 14. Deliverables

| Deliverable | Status |
|---|---|
| Project Analysis | ✅ |
| Test Plan | ✅ |
| Test Strategy | ✅ |
| Requirements Catalog | ✅ |
| Test Cases (80+) | ✅ |
| RTM | ✅ |
| Smoke Suite | ✅ |
| Sanity Suite | ✅ |
| Regression Suite | ✅ |
| Defect Report | ✅ |
| Automation Framework | ✅ |
| Automated Tests | ✅ |
| Postman Collection | ✅ |
| Security Testing Doc | ✅ |
| Accessibility Testing Doc | ✅ |
| QA Metrics | ✅ |
| Test Execution Report | ✅ |
| Test Summary Report | ✅ |
| GitHub Actions Workflow | ✅ |
| README | ✅ |
| Interview Explanation | ✅ |

---

## 15. Assumptions

1. The application is functionally stable (not under active development)
2. Sandbox mode faithfully simulates the intended production behavior
3. Admin credentials (`admin@smartparking.com`) will remain valid throughout testing
4. Browser `localStorage` is not cleared between test steps within the same session
5. GitHub Pages hosting will remain available during the test window

---

## 16. Constraints

1. No access to source code repository
2. No live backend or database
3. All automation must work against the static hosted URL
4. Test execution cannot simulate RFID/Fastag hardware
5. No payment processing can be triggered
