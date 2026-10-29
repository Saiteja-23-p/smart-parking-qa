// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright Configuration
 * Smart Parking System — QA Automation
 * Author: Poosala Saiteja
 */
module.exports = defineConfig({
  // Directory containing test files
  testDir: './tests',

  // Maximum time one test can run (ms)
  timeout: 30000,

  // Expect timeout for assertions
  expect: {
    timeout: 10000,
  },

  // Run tests in files in parallel
  fullyParallel: false,

  // Fail the build on CI if test.only is in the source
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Limit parallel workers on CI
  workers: process.env.CI ? 2 : undefined,

  // Reporter configuration
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    ['json', { outputFile: 'reports/test-results.json' }],
  ],

  // Shared settings for all the projects
  use: {
    // Base URL for navigation
    baseURL: 'https://saiteja-23-p.github.io/smart-parking-system',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Take screenshot on failure
    screenshot: 'only-on-failure',

    // Video on failure
    video: 'on-first-retry',

    // Slow down actions for debugging (0 in CI)
    actionTimeout: 10000,

    // Headless by default (set HEADED=1 env var for headed)
    headless: process.env.HEADED !== '1',
  },

  // Test projects — browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'edge',
      use: { ...devices['Desktop Edge'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  // Output directory for test artifacts
  outputDir: 'reports/test-artifacts',
});
