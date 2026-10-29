/**
 * Test Suite: Authentication Tests
 * Smart Parking System — QA Automation
 * Tags: @auth @regression
 * Author: Poosala Saiteja
 *
 * Covers: TC-006 through TC-019
 * Run with: npx playwright test auth
 */

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { clearSession } = require('../utils/auth.helper');

const BASE_URL = 'https://saiteja-23-p.github.io/smart-parking-system';

test.describe('@auth Authentication Tests', () => {

  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await clearSession(page);
    await loginPage.navigate();
  });

  // ─── TC-006: Valid User Login ─────────────────────────────────────────────────
  test('TC-006 @regression | Valid user login redirects to dashboard', async ({ page }) => {
    await loginPage.login('user@test.com', 'password123');
    await page.waitForTimeout(2000);

    const url = page.url();
    const bodyText = await page.textContent('body');

    // Should not be on login page anymore
    const leftLoginPage = !url.endsWith('#/login') &&
                          (url.includes('/dashboard') || url.includes('/admin') ||
                           bodyText.includes('Dashboard') || bodyText.includes('Active'));

    expect(leftLoginPage, 'User should be redirected from login after successful auth').toBeTruthy();
  });

  // ─── TC-007: Admin Login ──────────────────────────────────────────────────────
  test('TC-007 @regression | Admin login redirects to admin area', async ({ page }) => {
    await loginPage.login('admin@smartparking.com', 'Admin@123');
    await page.waitForTimeout(2000);

    const url = page.url();
    const bodyText = await page.textContent('body');

    const isAdminArea = url.includes('/admin') || bodyText.includes('Admin') ||
                        bodyText.includes('ROLE_ADMIN') || bodyText.includes('Administrator');
    expect(isAdminArea, 'Admin should reach admin area').toBeTruthy();
  });

  // ─── TC-008: Invalid Email Format ────────────────────────────────────────────
  test('TC-008 | Login with malformed email shows error', async ({ page }) => {
    await loginPage.login('notanemail', 'password123');
    await page.waitForTimeout(1500);

    const url = page.url();
    const bodyText = await page.textContent('body');

    // Should still be on login OR show error
    const errorShown = url.includes('/login') ||
                       bodyText.includes('rejected') ||
                       bodyText.includes('invalid') ||
                       bodyText.includes('error');
    expect(errorShown, 'Invalid email should show error or keep user on login page').toBeTruthy();
  });

  // ─── TC-009: Empty Email ──────────────────────────────────────────────────────
  test('TC-009 | Login with empty email shows required error', async ({ page }) => {
    // Only fill password, leave email blank
    const passwordInput = page.locator('input[type="password"]').first();
    await passwordInput.fill('password123');

    const submitButton = page.locator('button[type="submit"], button:has-text("Login")').first();
    await submitButton.click();
    await page.waitForTimeout(1500);

    // Should remain on login page
    const url = page.url();
    expect(url).toContain('login');
  });

  // ─── TC-010: Empty Password ───────────────────────────────────────────────────
  test('TC-010 | Login with empty password shows required error', async ({ page }) => {
    const emailInput = page.locator('input[type="email"], input[name="email"]').first();
    await emailInput.fill('user@test.com');

    const submitButton = page.locator('button[type="submit"], button:has-text("Login")').first();
    await submitButton.click();
    await page.waitForTimeout(1500);

    // Should remain on login page or show error
    const url = page.url();
    expect(url).toContain('login');
  });

  // ─── TC-012: Wrong Password ───────────────────────────────────────────────────
  test('TC-012 | Wrong password shows login rejection message', async ({ page }) => {
    await loginPage.login('user@test.com', 'totallyWrongPassword!@#');
    await page.waitForTimeout(2000);

    const bodyText = await page.textContent('body');
    const url = page.url();

    // Should stay on login or show rejection
    const isRejected = url.includes('/login') ||
                       bodyText.includes('rejected') ||
                       bodyText.includes('error') ||
                       bodyText.includes('invalid') ||
                       bodyText.includes('failed');
    expect(isRejected, 'Wrong password should be rejected').toBeTruthy();
  });

  // ─── TC-013: Password Masking ─────────────────────────────────────────────────
  test('TC-013 | Password field masks input characters', async ({ page }) => {
    const passwordInput = page.locator('input[type="password"]').first();

    // Verify input type is password (which causes masking)
    const inputType = await passwordInput.getAttribute('type');
    expect(inputType).toBe('password');
  });

  // ─── TC-014: SQL Injection in Email ──────────────────────────────────────────
  test('TC-014 @security | SQL injection in email field does not bypass login', async ({ page }) => {
    await loginPage.login("' OR 1=1 --", 'anything');
    await page.waitForTimeout(2000);

    const url = page.url();
    const bodyText = await page.textContent('body');

    // Must NOT be logged in or redirected to protected page
    const noBypass = url.includes('/login') || bodyText.includes('rejected') || bodyText.includes('error');
    expect(noBypass, 'SQL injection must not bypass authentication').toBeTruthy();
  });

  // ─── TC-015: XSS in Email Field ───────────────────────────────────────────────
  test('TC-015 @security | XSS payload in email field is not executed', async ({ page }) => {
    let alertFired = false;
    page.on('dialog', dialog => {
      alertFired = true;
      dialog.dismiss();
    });

    await loginPage.login("<script>alert('xss')</script>", 'password');
    await page.waitForTimeout(2000);

    expect(alertFired, 'XSS alert must not be executed').toBeFalsy();
  });

  // ─── TC-017: Very Long Email ──────────────────────────────────────────────────
  test('TC-017 | Very long email (300 chars) does not crash application', async ({ page }) => {
    const longEmail = 'a'.repeat(290) + '@test.com';
    await loginPage.login(longEmail, 'password123');
    await page.waitForTimeout(2000);

    // Page should not crash
    const url = page.url();
    expect(url).toBeTruthy();

    const bodyText = await page.textContent('body');
    expect(bodyText).toBeTruthy();
  });

  // ─── TC-018: Session Persistence on Refresh ───────────────────────────────────
  test('TC-018 | Session persists after page refresh', async ({ page }) => {
    await loginPage.login('user@test.com', 'password123');
    await page.waitForTimeout(2000);

    // Get token before refresh
    const tokenBefore = await page.evaluate(() => localStorage.getItem('token'));

    // Refresh
    await page.reload();
    await page.waitForLoadState('networkidle');

    const tokenAfter = await page.evaluate(() => localStorage.getItem('token'));
    expect(tokenAfter).toBe(tokenBefore);
  });

});
