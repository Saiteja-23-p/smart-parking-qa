# REQUIREMENT TRACEABILITY MATRIX (RTM)
## Smart Parking System — QA Project

| Field | Value |
|---|---|
| Author | Poosala Saiteja |
| Date | 2026-10-29 |
| Version | 1.0 |

---

## Requirements Catalog

| Req ID | Module | Description | Priority | Risk | Testable Condition |
|---|---|---|---|---|---|
| FR-001 | Landing Page | Application loads and displays homepage with navigation | High | Low | Page loads at URL; hero text visible |
| FR-002 | Authentication | User can login with valid email/password | Critical | High | Login form submits; user redirected to dashboard |
| FR-003 | Registration | New user can register an account | High | Medium | Register form accepts valid data; account created |
| FR-004 | Parking Discovery | Logged-in user can view parking locations and slots | Critical | High | Slot grid displays available/reserved status |
| FR-005 | Slot Selection | User can select an available slot | Critical | High | Clicking available slot opens booking form |
| FR-006 | Booking Form | User can fill booking form with vehicle number and duration | Critical | High | Form accepts valid data; validates required fields |
| FR-007 | Booking Confirmation | System confirms booking and provides token | Critical | High | Confirmation shown with TOKEN-XX format |
| FR-008 | User Dashboard | User can view active bookings and history | High | Medium | Dashboard loads; bookings listed |
| FR-009 | Admin Panel | Admin can access admin dashboard, analytics, and slot management | Critical | High | Admin panel only accessible to admin role |
| FR-010 | Logout | User can logout and session is terminated | Critical | High | Token cleared; redirect to login; protected routes blocked |
| FR-011 | Navigation | All navigation links are functional | Medium | Low | Each nav link navigates to correct page |
| FR-012 | Security | Protected routes enforce authentication | Critical | High | Unauth access redirects to login; role-based access enforced |
| FR-013 | Responsive Design | Application is usable on mobile, tablet, desktop | Medium | Medium | No overflow; all elements usable at each viewport |
| FR-014 | Accessibility | Basic accessibility standards met | Medium | Medium | Keyboard nav works; inputs have labels |
| FR-015 | Regression | Core flows remain stable after changes | High | High | All P0 test cases pass consistently |

---

## Traceability Matrix

| Req ID | Requirement | Test Case IDs | Test Types | Priority | Coverage | Defect ID |
|---|---|---|---|---|---|---|
| FR-001 | Landing page loads | TC-001, TC-002, TC-003, TC-004, TC-005 | Smoke, UI, Functional | P0 | ✅ 5 TCs | None |
| FR-002 | User login | TC-006, TC-007, TC-008, TC-009, TC-010, TC-011, TC-012, TC-013, TC-016, TC-017, TC-018, TC-019, NEG-001 to NEG-006, SEC-005 to SEC-006, BVA-020 | Functional, Negative, Security, Boundary | P0 | ✅ 18+ TCs | DEF-001 (if found) |
| FR-003 | Registration | TC-020, TC-021, TC-022, TC-023, TC-024, TC-025, NEG-012 to NEG-014, BVA-015 to BVA-017 | Functional, Negative, Boundary | P1 | ✅ 9+ TCs | None |
| FR-004 | Parking discovery | TC-026, TC-027, TC-028, TC-091 | Smoke, Functional | P0 | ✅ 4 TCs | None |
| FR-005 | Slot selection | TC-029, TC-030, TC-031, TC-032, TC-033, TC-093, NEG-020 | Smoke, UI, Functional, Negative | P0 | ✅ 7 TCs | None |
| FR-006 | Booking form | TC-034, TC-035, TC-036, TC-037, TC-038, TC-039, TC-040, TC-041, TC-042, TC-043, TC-044, TC-045, TC-046, NEG-007 to NEG-011, NEG-018, NEG-019, BVA-001 to BVA-014 | Functional, Negative, Security, Boundary | P0 | ✅ 25+ TCs | None |
| FR-007 | Booking confirmation | TC-047, TC-048, TC-049, TC-050, TC-092 | Functional, UI | P0 | ✅ 5 TCs | None |
| FR-008 | User dashboard | TC-051, TC-052, TC-053, TC-054, TC-055, TC-056, TC-057, TC-058 | Smoke, Functional | P1 | ✅ 8 TCs | None |
| FR-009 | Admin panel | TC-059, TC-060, TC-061, TC-062, TC-063, TC-064, TC-065, TC-094, SEC-003, SEC-004, NEG-017 | Smoke, Functional, Security | P0 | ✅ 11 TCs | None |
| FR-010 | Logout | TC-066, TC-067, TC-068, SEC-010, SEC-015 | Functional, Security | P0 | ✅ 5 TCs | None |
| FR-011 | Navigation | TC-069, TC-070, TC-071, TC-072, TC-095 | Functional, Negative | P1 | ✅ 5 TCs | None |
| FR-012 | Security | TC-073, TC-074, TC-075, SEC-001 to SEC-015 | Security | P0 | ✅ 18 TCs | None |
| FR-013 | Responsive design | TC-076, TC-077, TC-078 | Responsive | P2 | ✅ 3 TCs | None |
| FR-014 | Accessibility | TC-079, TC-080 | Accessibility | P2 | ✅ 2 TCs | None |
| FR-015 | Regression | REG-001 to REG-012, SMK-001 to SMK-010 | Regression, Smoke | P0 | ✅ 22 TCs | None |

---

## Coverage Summary

| Metric | Value |
|---|---|
| Total Requirements | 15 |
| Requirements with Test Cases | 15 |
| **Requirement Coverage** | **100%** |
| Total Test Cases Designed | 95+ |
| Test Cases Executed (Manual) | Pending — requires tester to execute |
| Automated Test Cases | 25 (Playwright) |
| Automation Coverage | 26% (critical paths automated) |

> **Note:** Test execution results (Actual Results, Status) are populated after test execution. The "Not Executed" status reflects pre-execution state.

---

## Coverage by Test Type

| Test Type | Count |
|---|---|
| Functional | 45 |
| Negative | 20 |
| Boundary (BVA) | 20 |
| Security | 15 |
| Smoke | 10 |
| Regression | 12 |
| Responsive | 3 |
| Accessibility | 2 |
| **TOTAL** | **127** |
