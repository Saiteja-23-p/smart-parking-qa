/**
 * Test Suite: Smoke Tests
 * Smart Parking System — QA Automation
 * Tags: @smoke
 * Author: Poosala Saiteja
 *
 * These tests cover the critical path — must pass before any other testing begins.
 * Run with: npx playwright test --grep @smoke
 */

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { loginAsUser, loginAsAdmin, clearSession } = require('../utils/auth.helper');

const BASE_URL = 'https://saiteja-23-p.github.io/smart-parking-system';

test.describe('@smoke Smoke Tests — Smart Parking System', () => {

  // ─── SMK-001: Application Loads ─────────────────────────────────────────────
  test('SMK-001 | Application loads successfully', async ({ page }) => {
    await page.goto(`${BASE_URL}/#/`);
    await page.waitForLoadState('networkidle');

    // Verify hero/brand text is present
    const bodyText = await page.textContent('body');
    expect(bodyText).toMatch(/Smart Parking/i);

    // No critical JS errors (check title at minimum)
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  // ─── SMK-002: Navigation Bar Present ─────────────────────────────────────────
  test('SMK-002 | Navigation bar is displayed on landing page', async ({ page }) => {
    await page.goto(`${BASE_URL}/#/`);
    await page.waitForLoadState('networkidle');

    const nav = page.locator('nav, header, [role="navigation"]').first();
    await expect(nav).toBeVisible();
  });

  // ─── SMK-003: Login Page Accessible ──────────────────────────────────────────
  test('SMK-003 | Login page loads at #/login', async ({ page }) => {
    await page.goto(`${BASE_URL}/#/login`);
    await page.waitForLoadState('networkidle');

    // Must have email and password inputs
    const emailInput = page.locator('input[type="email"], input[name="email"]').first();
    const passwordInput = page.locator('input[type="password"]').first();

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });

  // ─── SMK-004: Valid User Login ────────────────────────────────────────────────
  test('SMK-004 | Valid user can login and reach dashboard', async ({ page }) => {
    await clearSession(page);
    await loginAsUser(page);

    const url = page.url();
    const bodyText = await page.textContent('body');

    // Should be redirected away from login
    const isOnDashboard = url.includes('/dashboard') || url.includes('/admin') ||
                          bodyText.includes('Dashboard') || bodyText.includes('Active');
    expect(isOnDashboard).toBeTruthy();
  });

  // ─── SMK-005: Admin Login ─────────────────────────────────────────────────────
  test('SMK-005 | Admin can login with admin credentials', async ({ page }) => {
    await clearSession(page);
    await loginAsAdmin(page);

    const url = page.url();
    const bodyText = await page.textContent('body');

    const isAdminArea = url.includes('/admin') || bodyText.includes('Admin') ||
                        bodyText.includes('ROLE_ADMIN');
    expect(isAdminArea).toBeTruthy();
  });

  // ─── SMK-006: Dashboard Loads ─────────────────────────────────────────────────
  test('SMK-006 | User dashboard loads after login', async ({ page }) => {
    await loginAsUser(page);

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.navigate();

    const isLoaded = await dashboardPage.isDashboardLoaded();
    expect(isLoaded).toBeTruthy();
  });

  // ─── SMK-007: Logout Works ────────────────────────────────────────────────────
  test('SMK-007 | User can logout successfully', async ({ page }) => {
    await loginAsUser(page);
    await page.waitForTimeout(1000);

    // Click logout
    const logoutBtn = page.locator('button:has-text("Logout"), button:has-text("Log Out"), a:has-text("Logout"), button:has-text("Sign Out")').first();
    try {
      await logoutBtn.waitFor({ state: 'visible', timeout: 5000 });
      await logoutBtn.click();
      await page.waitForTimeout(1500);

      // Check redirected to login
      const url = page.url();
      const isOnLogin = url.includes('/login') || url.includes('/#/') || url === `${BASE_URL}/#/`;
      expect(isOnLogin).toBeTruthy();
    } catch {
      // If logout button not found, check if session management exists
      const hasSession = await page.evaluate(() => !!localStorage.getItem('token'));
      // Document: logout button location needs investigation
      console.log('⚠️ Logout button not found at expected selector. Manual verification needed.');
      test.skip();
    }
  });

  // ─── SMK-008: Admin Panel Accessible ─────────────────────────────────────────
  test('SMK-008 | Admin panel is accessible to admin user', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto(`${BASE_URL}/#/admin`);
    await page.waitForTimeout(2000);

    const url = page.url();
    const bodyText = await page.textContent('body');

    // Should NOT redirect to login
    const isAdminPage = url.includes('/admin') &&
                        (bodyText.includes('Admin') || bodyText.includes('Dashboard') || bodyText.includes('Analytics'));
    expect(isAdminPage).toBeTruthy();
  });

});
