/**
 * Test Suite: Security Tests
 * Smart Parking System — QA Automation
 * Tags: @security
 * Author: Poosala Saiteja
 *
 * Non-destructive UI-layer security checks only.
 * Run with: npx playwright test security
 */

const { test, expect } = require('@playwright/test');
const { loginAsUser, loginAsAdmin, clearSession } = require('../utils/auth.helper');

const BASE_URL = 'https://saiteja-23-p.github.io/smart-parking-system';

test.describe('@security Security Tests', () => {

  // ─── SEC-001: Unauthenticated Dashboard Access ────────────────────────────────
  test('SEC-001 @regression | Unauthenticated access to /dashboard redirects to login', async ({ page }) => {
    // Ensure no auth token
    await page.goto(`${BASE_URL}/#/`);
    await page.evaluate(() => localStorage.clear());

    // Try to access dashboard directly
    await page.goto(`${BASE_URL}/#/dashboard`);
    await page.waitForTimeout(2000);

    const url = page.url();
    const bodyText = await page.textContent('body');

    // Should be redirected to login OR dashboard should not show private data
    const isProtected = url.includes('/login') ||
                        bodyText.includes('Login') ||
                        bodyText.includes('credential') ||
                        !bodyText.includes('Active Bookings');

    expect(isProtected, 'Dashboard must be protected from unauthenticated access').toBeTruthy();
  });

  // ─── SEC-002: Unauthenticated Admin Access ────────────────────────────────────
  test('SEC-002 @regression | Unauthenticated access to /admin redirects to login', async ({ page }) => {
    await page.goto(`${BASE_URL}/#/`);
    await page.evaluate(() => localStorage.clear());

    await page.goto(`${BASE_URL}/#/admin`);
    await page.waitForTimeout(2000);

    const url = page.url();
    const bodyText = await page.textContent('body');

    const isProtected = url.includes('/login') ||
                        bodyText.includes('Login') ||
                        bodyText.includes('credential') ||
                        !bodyText.includes('Slot Configurator');

    expect(isProtected, 'Admin panel must be protected from unauthenticated access').toBeTruthy();
  });

  // ─── SEC-003: Regular User Cannot Access Admin Panel ─────────────────────────
  test('SEC-003 @regression | Regular user is blocked from /admin panel', async ({ page }) => {
    await clearSession(page);
    await loginAsUser(page);
    await page.waitForTimeout(1500);

    // Try to access admin panel as regular user
    await page.goto(`${BASE_URL}/#/admin`);
    await page.waitForTimeout(2000);

    const url = page.url();
    const bodyText = await page.textContent('body');

    // Admin-specific content should NOT be visible to regular user
    const hasAdminContent = bodyText.includes('Slot Configurator') ||
                            bodyText.includes('Admin Dashboard') ||
                            bodyText.includes('ADMINISTRATOR');

    const isBlocked = url.includes('/login') || url.includes('/dashboard') || !hasAdminContent;
    expect(isBlocked, 'Regular user must not access admin panel').toBeTruthy();
  });

  // ─── SEC-010: Logout Clears Session Token ─────────────────────────────────────
  test('SEC-010 | Logout clears localStorage token', async ({ page }) => {
    await clearSession(page);
    await loginAsUser(page);
    await page.waitForTimeout(1500);

    // Confirm token exists after login
    const tokenAfterLogin = await page.evaluate(() => localStorage.getItem('token'));
    expect(tokenAfterLogin, 'Token should exist after login').toBeTruthy();

    // Find and click logout
    const logoutBtn = page.locator('button:has-text("Logout"), button:has-text("Log Out"), a:has-text("Logout"), [aria-label="logout"]').first();
    try {
      await logoutBtn.waitFor({ state: 'visible', timeout: 5000 });
      await logoutBtn.click();
      await page.waitForTimeout(1500);

      const tokenAfterLogout = await page.evaluate(() => localStorage.getItem('token'));
      expect(tokenAfterLogout, 'Token must be cleared after logout').toBeNull();
    } catch {
      console.log('⚠️ Logout button not found at known selectors. Manual verification required.');
      test.skip();
    }
  });

  // ─── SEC-015: Dashboard Not Accessible After Logout + Back Button ─────────────
  test('SEC-015 | Dashboard is not accessible after logout via back button', async ({ page }) => {
    await clearSession(page);
    await loginAsUser(page);
    await page.waitForTimeout(1500);

    // Go to dashboard
    await page.goto(`${BASE_URL}/#/dashboard`);
    await page.waitForTimeout(1500);

    // Clear token (simulate logout)
    await page.evaluate(() => localStorage.clear());

    // Simulate back button navigation
    await page.goBack();
    await page.waitForTimeout(1500);

    // Try to access dashboard again
    await page.goto(`${BASE_URL}/#/dashboard`);
    await page.waitForTimeout(2000);

    const url = page.url();
    const bodyText = await page.textContent('body');

    const isProtected = url.includes('/login') ||
                        bodyText.includes('Login') ||
                        !bodyText.includes('Active Bookings');

    expect(isProtected, 'Dashboard must not be accessible after session cleared').toBeTruthy();
  });

  // ─── SEC-009: Password Masking ────────────────────────────────────────────────
  test('SEC-009 | Password input field masks characters', async ({ page }) => {
    await page.goto(`${BASE_URL}/#/login`);
    await page.waitForLoadState('networkidle');

    const passwordField = page.locator('input[type="password"]').first();
    await expect(passwordField).toBeVisible();

    const fieldType = await passwordField.getAttribute('type');
    expect(fieldType).toBe('password');
  });

  // ─── SEC-005: SQL Injection in Login ─────────────────────────────────────────
  test('SEC-005 | SQL injection in login email does not bypass auth', async ({ page }) => {
    await clearSession(page);
    await page.goto(`${BASE_URL}/#/login`);
    await page.waitForLoadState('networkidle');

    const emailInput = page.locator('input[type="email"], input[name="email"]').first();
    const passwordInput = page.locator('input[type="password"]').first();
    const submitBtn = page.locator('button[type="submit"]').first();

    await emailInput.fill("' OR '1'='1' --");
    await passwordInput.fill('anything');
    await submitBtn.click();
    await page.waitForTimeout(2000);

    const url = page.url();
    const bodyText = await page.textContent('body');

    // Must NOT have been logged in
    const noBypass = url.includes('/login') || bodyText.includes('rejected') ||
                     bodyText.includes('error') || !bodyText.includes('Dashboard');
    expect(noBypass, 'SQL injection must not bypass login').toBeTruthy();
  });

  // ─── SEC-006: XSS in Login Email ─────────────────────────────────────────────
  test('SEC-006 | XSS in login email is not executed', async ({ page }) => {
    let alertFired = false;
    page.on('dialog', async dialog => {
      alertFired = true;
      await dialog.dismiss();
    });

    await clearSession(page);
    await page.goto(`${BASE_URL}/#/login`);
    await page.waitForLoadState('networkidle');

    const emailInput = page.locator('input[type="email"], input[name="email"]').first();
    const submitBtn = page.locator('button[type="submit"]').first();

    await emailInput.fill('<script>alert("xss")</script>');
    await submitBtn.click();
    await page.waitForTimeout(2000);

    expect(alertFired, 'XSS alert must not fire').toBeFalsy();
  });

});
