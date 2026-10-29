# ACCESSIBILITY TESTING REPORT
## Smart Parking System — QA Project

| Field | Value |
|---|---|
| Author | Poosala Saiteja |
| Date | 2026-10-29 |
| Standard | WCAG 2.1 Level AA (basic manual checks) |

---

## Accessibility Test Cases

| ACC-ID | Check | Method | Guideline | Expected | Observed | Status |
|---|---|---|---|---|---|---|
| ACC-001 | All form inputs have labels | Manual inspect | WCAG 1.3.1 | Each `<input>` has `<label>` or `aria-label` | To be observed | Pending |
| ACC-002 | Buttons have accessible names | Manual inspect | WCAG 4.1.2 | Buttons have text or aria-label | To be observed | Pending |
| ACC-003 | Images have alt text | Manual inspect | WCAG 1.1.1 | All `<img>` have non-empty alt attribute | To be observed | Pending |
| ACC-004 | Color contrast ratio | Manual/tool check | WCAG 1.4.3 | 4.5:1 minimum for normal text | To be observed | Pending |
| ACC-005 | Keyboard navigation - login form | Manual keyboard test | WCAG 2.1.1 | Tab moves Email → Password → Submit | To be observed | Pending |
| ACC-006 | Keyboard navigation - booking form | Manual keyboard test | WCAG 2.1.1 | All fields reachable by Tab | To be observed | Pending |
| ACC-007 | Focus indicators visible | Manual visual check | WCAG 2.4.7 | Focused elements have visible outline | To be observed | Pending |
| ACC-008 | Heading hierarchy | Manual DOM inspect | WCAG 1.3.1 | h1 → h2 → h3 structure, no skips | To be observed | Pending |
| ACC-009 | Error messages linked to fields | Manual inspect | WCAG 1.3.1 | Validation errors associated via aria-describedby | To be observed | Pending |
| ACC-010 | No keyboard trap | Manual keyboard test | WCAG 2.1.2 | Focus can be moved from any element by keyboard | To be observed | Pending |
| ACC-011 | Page language declared | DOM inspection | WCAG 3.1.1 | `<html lang="en">` or equivalent | Confirmed ✅ — found in bundle | PASS |
| ACC-012 | Form submit via keyboard Enter | Manual keyboard test | WCAG 2.1.1 | Pressing Enter on submit button submits form | To be observed | Pending |

---

## Axe-Core Integration (Playwright)

To add automated accessibility scanning to the Playwright suite:

### Installation
```bash
npm install @axe-core/playwright
```

### Usage in Tests
```javascript
const { checkA11y } = require('@axe-core/playwright');

test('Accessibility - Login Page', async ({ page }) => {
  await page.goto('https://saiteja-23-p.github.io/smart-parking-system/#/login');
  await page.waitForLoadState('networkidle');

  const results = await checkA11y(page, null, {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa'],
    },
  });

  // Log violations without failing (for reporting purposes)
  if (results.violations.length > 0) {
    console.log('Accessibility violations found:');
    results.violations.forEach(v => {
      console.log(`  [${v.impact}] ${v.description} — ${v.helpUrl}`);
    });
  }

  // Fail on critical violations
  const criticalViolations = results.violations.filter(v => v.impact === 'critical');
  expect(criticalViolations.length).toBe(0);
});
```

**Note:** Axe-core integration is documented here for implementation. Actual axe scan results require runtime execution.

---

## Keyboard Navigation Test Procedure

1. Open the application at `#/login`
2. Press `Tab` — focus should move to email input
3. Type email address
4. Press `Tab` — focus should move to password input
5. Type password
6. Press `Tab` — focus should move to submit button
7. Press `Enter` or `Space` — form should submit
8. On error: focus should return to the first invalid field

Expected: Entire login flow completable without mouse

---

## WCAG 2.1 Quick Reference Used

| Criterion | Level | Description |
|---|---|---|
| 1.1.1 Non-text Content | A | Images need alt text |
| 1.3.1 Info and Relationships | A | Form labels, heading structure |
| 1.4.3 Contrast (Minimum) | AA | 4.5:1 for text |
| 2.1.1 Keyboard | A | All functionality via keyboard |
| 2.1.2 No Keyboard Trap | A | User can navigate away |
| 2.4.7 Focus Visible | AA | Visible focus indicator |
| 3.1.1 Language of Page | A | Page language declared |
| 4.1.2 Name, Role, Value | A | All UI components have name and role |
