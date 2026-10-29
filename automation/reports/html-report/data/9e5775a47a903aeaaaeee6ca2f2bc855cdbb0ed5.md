# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: security.test.js >> @security Security Tests >> SEC-015 | Dashboard is not accessible after logout via back button
- Location: tests/security.test.js:107:3

# Error details

```
Error: Dashboard must not be accessible after session cleared

expect(received).toBeTruthy()

Received: false
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - complementary [ref=e4]:
    - heading "Smart ParkingSystem" [level=1] [ref=e7]
    - generic [ref=e9]:
      - generic [ref=e10]: Main Console
      - navigation [ref=e11]:
        - link "Dashboard" [ref=e12] [cursor=pointer]:
          - /url: "#/dashboard"
        - link "Live Map" [ref=e18] [cursor=pointer]:
          - /url: "#/map"
        - link "Slot Booking" [ref=e21] [cursor=pointer]:
          - /url: "#/book"
        - link "Fastag Wallet" [ref=e24] [cursor=pointer]:
          - /url: "#/wallet"
        - link "Booking History" [ref=e28] [cursor=pointer]:
          - /url: "#/history"
        - link "User Profile" [ref=e33] [cursor=pointer]:
          - /url: "#/profile"
    - generic [ref=e38]:
      - generic [ref=e39]:
        - generic [ref=e40]: U
        - generic [ref=e41]:
          - paragraph [ref=e42]: User
          - paragraph [ref=e43]: COMMUTER
      - button "Sign Out" [ref=e44] [cursor=pointer]
  - generic [ref=e48]:
    - banner [ref=e49]:
      - generic [ref=e50]:
        - generic [ref=e51]: Hyderabad, Telangana
        - generic [ref=e56]: "Fastag Node: Connected"
      - generic [ref=e59]:
        - button [ref=e60] [cursor=pointer]
        - generic [ref=e66]: User
    - main [ref=e71]:
      - generic [ref=e73]:
        - generic [ref=e74]:
          - generic [ref=e75]:
            - generic [ref=e76]: Hyderabad Smart Commuter Node
            - heading "Commuter Command Center" [level=1] [ref=e77]
          - button "Locate Nearby Hubs" [ref=e79] [cursor=pointer]
        - generic [ref=e83]:
          - generic [ref=e85]:
            - generic [ref=e86]: Active Bookings
            - generic [ref=e90]:
              - heading "1" [level=3] [ref=e91]
              - paragraph [ref=e92]: Active Navigation Link
          - generic [ref=e94]:
            - generic [ref=e95]: Total Sessions
            - generic [ref=e101]:
              - heading "2" [level=3] [ref=e102]
              - paragraph [ref=e103]: Completed Indian dock sessions
          - generic [ref=e105]:
            - generic [ref=e106]: Fastag wallet balance
            - generic [ref=e111]:
              - heading "₹350.00" [level=3] [ref=e112]
              - paragraph [ref=e113]: Tariff clearing ready
        - generic [ref=e114]:
          - generic [ref=e117]:
            - generic [ref=e118]: ACTIVE
            - generic [ref=e120]: ACTIVE GATE RESERVATION
            - heading "IN-F1-01" [level=4] [ref=e121]
            - paragraph [ref=e122]: Inorbit Mall Smart Hub
            - generic [ref=e123]:
              - generic [ref=e124]:
                - generic [ref=e125]: "VEHICLE:"
                - generic [ref=e126]: TS09AB1234
              - generic [ref=e127]:
                - generic [ref=e128]: "DOCK_TIME:"
                - generic [ref=e129]: 10:28 PM
            - generic [ref=e130]:
              - button "View QR Pass" [ref=e131] [cursor=pointer]
              - button "GPS GPS" [ref=e134] [cursor=pointer]
          - generic [ref=e139]:
            - generic [ref=e140]:
              - generic [ref=e141]: Recent Parking History Logs
              - generic [ref=e142]: SECURE_LEDGER
            - table [ref=e144]:
              - rowgroup [ref=e145]:
                - row [ref=e146]:
                  - columnheader "Slot Bay" [ref=e147]
                  - columnheader "Hyderabad Hub" [ref=e148]
                  - columnheader "Duration interval" [ref=e149]
                  - columnheader "Gate Status" [ref=e150]
                  - columnheader "Cleared Tariff" [ref=e151]
              - rowgroup [ref=e152]:
                - row [ref=e153] [cursor=pointer]:
                  - cell "IN-F1-01" [ref=e154]
                  - cell "Inorbit Mall Smart Hub" [ref=e155]
                  - cell "10:28 PM - 12:28 AM" [ref=e156]
                  - cell "ACTIVE" [ref=e157]
                  - cell "₹100.00" [ref=e159]
                - row [ref=e160] [cursor=pointer]:
                  - cell "TH-01" [ref=e161]
                  - cell "T-Hub Innovation Parking" [ref=e162]
                  - cell "10:28 PM - 12:28 AM" [ref=e163]
                  - cell "COMPLETED" [ref=e164]
                  - cell "₹80.00" [ref=e166]
```

# Test source

```ts
  34  |                         bodyText.includes('credential') ||
  35  |                         !bodyText.includes('Active Bookings');
  36  | 
  37  |     expect(isProtected, 'Dashboard must be protected from unauthenticated access').toBeTruthy();
  38  |   });
  39  | 
  40  |   // ─── SEC-002: Unauthenticated Admin Access ────────────────────────────────────
  41  |   test('SEC-002 @regression | Unauthenticated access to /admin redirects to login', async ({ page }) => {
  42  |     await page.goto(`${BASE_URL}/#/`);
  43  |     await page.evaluate(() => localStorage.clear());
  44  | 
  45  |     await page.goto(`${BASE_URL}/#/admin`);
  46  |     await page.waitForTimeout(2000);
  47  | 
  48  |     const url = page.url();
  49  |     const bodyText = await page.textContent('body');
  50  | 
  51  |     const isProtected = url.includes('/login') ||
  52  |                         bodyText.includes('Login') ||
  53  |                         bodyText.includes('credential') ||
  54  |                         !bodyText.includes('Slot Configurator');
  55  | 
  56  |     expect(isProtected, 'Admin panel must be protected from unauthenticated access').toBeTruthy();
  57  |   });
  58  | 
  59  |   // ─── SEC-003: Regular User Cannot Access Admin Panel ─────────────────────────
  60  |   test('SEC-003 @regression | Regular user is blocked from /admin panel', async ({ page }) => {
  61  |     await clearSession(page);
  62  |     await loginAsUser(page);
  63  |     await page.waitForTimeout(1500);
  64  | 
  65  |     // Try to access admin panel as regular user
  66  |     await page.goto(`${BASE_URL}/#/admin`);
  67  |     await page.waitForTimeout(2000);
  68  | 
  69  |     const url = page.url();
  70  |     const bodyText = await page.textContent('body');
  71  | 
  72  |     // Admin-specific content should NOT be visible to regular user
  73  |     const hasAdminContent = bodyText.includes('Slot Configurator') ||
  74  |                             bodyText.includes('Admin Dashboard') ||
  75  |                             bodyText.includes('ADMINISTRATOR');
  76  | 
  77  |     const isBlocked = url.includes('/login') || url.includes('/dashboard') || !hasAdminContent;
  78  |     expect(isBlocked, 'Regular user must not access admin panel').toBeTruthy();
  79  |   });
  80  | 
  81  |   // ─── SEC-010: Logout Clears Session Token ─────────────────────────────────────
  82  |   test('SEC-010 | Logout clears localStorage token', async ({ page }) => {
  83  |     await clearSession(page);
  84  |     await loginAsUser(page);
  85  |     await page.waitForTimeout(1500);
  86  | 
  87  |     // Confirm token exists after login
  88  |     const tokenAfterLogin = await page.evaluate(() => localStorage.getItem('token'));
  89  |     expect(tokenAfterLogin, 'Token should exist after login').toBeTruthy();
  90  | 
  91  |     // Find and click logout
  92  |     const logoutBtn = page.locator('button:has-text("Logout"), button:has-text("Log Out"), a:has-text("Logout"), [aria-label="logout"]').first();
  93  |     try {
  94  |       await logoutBtn.waitFor({ state: 'visible', timeout: 5000 });
  95  |       await logoutBtn.click();
  96  |       await page.waitForTimeout(1500);
  97  | 
  98  |       const tokenAfterLogout = await page.evaluate(() => localStorage.getItem('token'));
  99  |       expect(tokenAfterLogout, 'Token must be cleared after logout').toBeNull();
  100 |     } catch {
  101 |       console.log('⚠️ Logout button not found at known selectors. Manual verification required.');
  102 |       test.skip();
  103 |     }
  104 |   });
  105 | 
  106 |   // ─── SEC-015: Dashboard Not Accessible After Logout + Back Button ─────────────
  107 |   test('SEC-015 | Dashboard is not accessible after logout via back button', async ({ page }) => {
  108 |     await clearSession(page);
  109 |     await loginAsUser(page);
  110 |     await page.waitForTimeout(1500);
  111 | 
  112 |     // Go to dashboard
  113 |     await page.goto(`${BASE_URL}/#/dashboard`);
  114 |     await page.waitForTimeout(1500);
  115 | 
  116 |     // Clear token (simulate logout)
  117 |     await page.evaluate(() => localStorage.clear());
  118 | 
  119 |     // Simulate back button navigation
  120 |     await page.goBack();
  121 |     await page.waitForTimeout(1500);
  122 | 
  123 |     // Try to access dashboard again
  124 |     await page.goto(`${BASE_URL}/#/dashboard`);
  125 |     await page.waitForTimeout(2000);
  126 | 
  127 |     const url = page.url();
  128 |     const bodyText = await page.textContent('body');
  129 | 
  130 |     const isProtected = url.includes('/login') ||
  131 |                         bodyText.includes('Login') ||
  132 |                         !bodyText.includes('Active Bookings');
  133 | 
> 134 |     expect(isProtected, 'Dashboard must not be accessible after session cleared').toBeTruthy();
      |                                                                                   ^ Error: Dashboard must not be accessible after session cleared
  135 |   });
  136 | 
  137 |   // ─── SEC-009: Password Masking ────────────────────────────────────────────────
  138 |   test('SEC-009 | Password input field masks characters', async ({ page }) => {
  139 |     await page.goto(`${BASE_URL}/#/login`);
  140 |     await page.waitForLoadState('networkidle');
  141 | 
  142 |     const passwordField = page.locator('input[type="password"]').first();
  143 |     await expect(passwordField).toBeVisible();
  144 | 
  145 |     const fieldType = await passwordField.getAttribute('type');
  146 |     expect(fieldType).toBe('password');
  147 |   });
  148 | 
  149 |   // ─── SEC-005: SQL Injection in Login ─────────────────────────────────────────
  150 |   test('SEC-005 | SQL injection in login email does not bypass auth', async ({ page }) => {
  151 |     await clearSession(page);
  152 |     await page.goto(`${BASE_URL}/#/login`);
  153 |     await page.waitForLoadState('networkidle');
  154 | 
  155 |     const emailInput = page.locator('input[type="email"], input[name="email"]').first();
  156 |     const passwordInput = page.locator('input[type="password"]').first();
  157 |     const submitBtn = page.locator('button[type="submit"]').first();
  158 | 
  159 |     await emailInput.fill("' OR '1'='1' --");
  160 |     await passwordInput.fill('anything');
  161 |     await submitBtn.click();
  162 |     await page.waitForTimeout(2000);
  163 | 
  164 |     const url = page.url();
  165 |     const bodyText = await page.textContent('body');
  166 | 
  167 |     // Must NOT have been logged in
  168 |     const noBypass = url.includes('/login') || bodyText.includes('rejected') ||
  169 |                      bodyText.includes('error') || !bodyText.includes('Dashboard');
  170 |     expect(noBypass, 'SQL injection must not bypass login').toBeTruthy();
  171 |   });
  172 | 
  173 |   // ─── SEC-006: XSS in Login Email ─────────────────────────────────────────────
  174 |   test('SEC-006 | XSS in login email is not executed', async ({ page }) => {
  175 |     let alertFired = false;
  176 |     page.on('dialog', async dialog => {
  177 |       alertFired = true;
  178 |       await dialog.dismiss();
  179 |     });
  180 | 
  181 |     await clearSession(page);
  182 |     await page.goto(`${BASE_URL}/#/login`);
  183 |     await page.waitForLoadState('networkidle');
  184 | 
  185 |     const emailInput = page.locator('input[type="email"], input[name="email"]').first();
  186 |     const submitBtn = page.locator('button[type="submit"]').first();
  187 | 
  188 |     await emailInput.fill('<script>alert("xss")</script>');
  189 |     await submitBtn.click();
  190 |     await page.waitForTimeout(2000);
  191 | 
  192 |     expect(alertFired, 'XSS alert must not fire').toBeFalsy();
  193 |   });
  194 | 
  195 | });
  196 | 
```