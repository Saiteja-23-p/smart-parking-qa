/**
 * Utility: Auth Helper
 * Smart Parking System — QA Automation
 * Author: Poosala Saiteja
 */

const TEST_CREDENTIALS = {
  user: {
    email: 'user@test.com',
    password: 'password123',
    role: 'ROLE_USER',
  },
  admin: {
    email: 'admin@smartparking.com',
    password: 'Admin@123',
    role: 'ROLE_ADMIN',
  },
};

const BASE_URL = 'https://saiteja-23-p.github.io/smart-parking-system';

/**
 * Login as a regular user through the UI
 * @param {import('@playwright/test').Page} page
 */
async function loginAsUser(page) {
  await page.goto(`${BASE_URL}/#/login`);
  await page.waitForLoadState('networkidle');

  // Fill login form
  const emailInput = page.locator('input[type="email"], input[name="email"]').first();
  const passwordInput = page.locator('input[type="password"]').first();
  const submitButton = page.locator('button[type="submit"], button:has-text("Login")').first();

  await emailInput.fill(TEST_CREDENTIALS.user.email);
  await passwordInput.fill(TEST_CREDENTIALS.user.password);
  await submitButton.click();

  // Wait for redirect
  await page.waitForTimeout(2000);
}

/**
 * Login as admin through the UI
 * @param {import('@playwright/test').Page} page
 */
async function loginAsAdmin(page) {
  await page.goto(`${BASE_URL}/#/login`);
  await page.waitForLoadState('networkidle');

  const emailInput = page.locator('input[type="email"], input[name="email"]').first();
  const passwordInput = page.locator('input[type="password"]').first();
  const submitButton = page.locator('button[type="submit"], button:has-text("Login")').first();

  await emailInput.fill(TEST_CREDENTIALS.admin.email);
  await passwordInput.fill(TEST_CREDENTIALS.admin.password);
  await submitButton.click();

  await page.waitForTimeout(2000);
}

/**
 * Clear session (logout state)
 * @param {import('@playwright/test').Page} page
 */
async function clearSession(page) {
  try {
    if (page.url() === 'about:blank') {
      await page.goto(`${BASE_URL}/#/`);
    }
    await page.evaluate(() => {
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch (e) {}
    });
  } catch (e) {
    // Gracefully ignore if page context does not permit storage access
  }
}

/**
 * Check if user is authenticated
 * @param {import('@playwright/test').Page} page
 */
async function isAuthenticated(page) {
  return await page.evaluate(() => !!localStorage.getItem('token'));
}

/**
 * Get stored user role
 * @param {import('@playwright/test').Page} page
 */
async function getStoredRole(page) {
  return await page.evaluate(() => {
    const user = localStorage.getItem('user');
    if (!user) return null;
    try {
      return JSON.parse(user).role;
    } catch {
      return null;
    }
  });
}

module.exports = {
  TEST_CREDENTIALS,
  BASE_URL,
  loginAsUser,
  loginAsAdmin,
  clearSession,
  isAuthenticated,
  getStoredRole,
};
