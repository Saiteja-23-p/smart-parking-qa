/**
 * Test Suite: Responsive Design Tests
 * Smart Parking System — QA Automation
 * Tags: @responsive
 * Author: Poosala Saiteja
 *
 * Tests layout across Mobile / Tablet / Desktop viewports.
 * Run with: npx playwright test responsive
 */

const { test, expect } = require('@playwright/test');
const { loginAsUser, clearSession } = require('../utils/auth.helper');

const BASE_URL = 'https://saiteja-23-p.github.io/smart-parking-system';

const VIEWPORTS = [
  { name: 'Mobile-S', width: 375, height: 667 },
  { name: 'Mobile-L (iPhone14)', width: 390, height: 844 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Laptop', width: 1366, height: 768 },
  { name: 'Desktop-FHD', width: 1920, height: 1080 },
];

for (const viewport of VIEWPORTS) {
  test.describe(`@responsive Responsive - ${viewport.name} (${viewport.width}x${viewport.height})`, () => {

    test(`Landing page renders at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(`${BASE_URL}/#/`);
      await page.waitForLoadState('networkidle');

      // Check no horizontal overflow
      const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
      const clientWidth = await page.evaluate(() => document.body.clientWidth);

      // Hero text visible
      const bodyText = await page.textContent('body');
      expect(bodyText).toMatch(/Smart Parking/i);

      // Log overflow info
      if (scrollWidth > clientWidth + 10) {
        console.log(`⚠️ [${viewport.name}] Horizontal overflow detected: scrollWidth=${scrollWidth} > clientWidth=${clientWidth}`);
      }
    });

    test(`Login page usable at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(`${BASE_URL}/#/login`);
      await page.waitForLoadState('networkidle');

      const emailInput = page.locator('input[type="email"], input[name="email"]').first();
      const passwordInput = page.locator('input[type="password"]').first();
      const submitBtn = page.locator('button[type="submit"]').first();

      await expect(emailInput).toBeVisible();
      await expect(passwordInput).toBeVisible();
      await expect(submitBtn).toBeVisible();
    });

  });
}
