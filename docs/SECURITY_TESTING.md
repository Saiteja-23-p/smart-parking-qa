# SECURITY TESTING REPORT
## Smart Parking System — QA Project

| Field | Value |
|---|---|
| Author | Poosala Saiteja |
| Date | 2026-10-29 |
| Scope | UI-layer security checks (non-destructive) |

> ⚠️ **Scope Statement:** All tests are non-destructive UI-layer security checks. No penetration testing, scanning tools, or destructive payloads were used. Tests are conducted against the client-side sandbox deployment only.

---

## Security Test Cases

| SEC-ID | Test | Method | Expected | Observed | Status | Risk |
|---|---|---|---|---|---|---|
| SEC-001 | Unauthenticated access to /dashboard | Navigate to URL without token | Redirect to login | To be observed | Pending | CRITICAL |
| SEC-002 | Unauthenticated access to /admin | Navigate to URL without token | Redirect to login | To be observed | Pending | CRITICAL |
| SEC-003 | Regular user access to /admin | Login as user, navigate to /admin | Access denied | To be observed | Pending | CRITICAL |
| SEC-004 | Admin access to /dashboard | Login as admin, navigate to /dashboard | Normal or redirected to /admin | To be observed | Pending | MEDIUM |
| SEC-005 | SQL injection in login email | Enter SQL payload in email field | No bypass; error shown | To be observed | Pending | HIGH |
| SEC-006 | XSS in login email | Enter script tag in email field | Alert not fired | To be observed | Pending | HIGH |
| SEC-007 | XSS in vehicle number | Enter script in vehicle number | Alert not fired | To be observed | Pending | HIGH |
| SEC-008 | Long payload in vehicle number | 1000-char string | No crash | To be observed | Pending | MEDIUM |
| SEC-009 | Password masking | Check input[type] of password field | type="password" | Confirmed ✅ | PASS | N/A |
| SEC-010 | Logout clears localStorage | Logout and check DevTools | Token removed | To be observed | Pending | HIGH |
| SEC-011 | Corrupt token manipulation | Edit localStorage token to garbage | Redirect to login | To be observed | Pending | HIGH |
| SEC-012 | URL querystring privilege escalation | Add ?admin=true to route | No escalation | To be observed | Pending | MEDIUM |
| SEC-013 | Sensitive data in page source | View source HTML | No credentials visible | To be observed | Pending | MEDIUM |
| SEC-014 | Token in URL bar | Complete login | No JWT in URL | To be observed | Pending | HIGH |
| SEC-015 | Dashboard via back button after logout | Logout then back button | Not accessible | To be observed | Pending | CRITICAL |

---

## Known Security Architecture Observations

### 1. Client-Side JWT Storage (Risk: MEDIUM)
The application stores authentication tokens in `localStorage`. This is a common pattern for SPAs but has known risks:
- **XSS attack scenario:** If an XSS vulnerability exists, an attacker could steal the token via `localStorage.getItem('token')`
- **Mitigation observed:** The application uses React rendering which inherently escapes JSX content; raw innerHTML is not used based on bundle analysis
- **Recommendation:** When backend is implemented, consider `httpOnly` cookies over localStorage for token storage

### 2. Mock Authentication in Production Bundle (Risk: HIGH — for production)
The JavaScript bundle contains hardcoded admin credentials logic:
```
if (e.email === 'admin@smartparking.com') return { jwt: '...mocktoken', role: 'ROLE_ADMIN' }
```
**Finding:** This is acceptable for a demo/sandbox. For production, all authentication logic must be server-side only. Client-side role assignment from email matching is a critical security flaw in a production scenario.

### 3. Role-Based Access Control (Client-Side Only — Risk: HIGH for production)
The current application enforces route protection on the client side only. A determined user could potentially bypass this by directly manipulating localStorage. Server-side authorization validation is required for production.

---

## Security Testing Limitations

| Limitation | Reason |
|---|---|
| No backend API testing | No live API accessible |
| No server-side session validation | Static hosting; no server |
| No penetration testing | Out of scope; static GitHub Pages |
| No network traffic analysis | Same-origin static assets only |
| No real JWT validation | Mock tokens used |
