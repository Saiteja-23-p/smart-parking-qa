/**
 * Page Object: LoginPage
 * Smart Parking System — QA Automation
 * Module: Authentication
 * Author: Poosala Saiteja
 */

class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Selectors — prefer aria/role over CSS where possible
    this.emailInput = page.locator('input[type="email"], input[name="email"], input[placeholder*="email" i], input[placeholder*="mail" i]').first();
    this.passwordInput = page.locator('input[type="password"]').first();
    this.loginButton = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("LOG IN"), button:has-text("Sign In")').first();
    this.errorMessage = page.locator('.error, [class*="error"], [class*="red"], [class*="alert"]').first();
    this.pageHeading = page.locator('h1, h2, h3').first();
  }

  /**
   * Navigate to login page
   */
  async navigate() {
    await this.page.goto('https://saiteja-23-p.github.io/smart-parking-system/#/login');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Fill and submit login form
   * @param {string} email
   * @param {string} password
   */
  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    // Wait for navigation or error to appear
    await this.page.waitForTimeout(1500);
  }

  /**
   * Login as regular user
   */
  async loginAsUser() {
    await this.navigate();
    await this.login('user@test.com', 'password123');
  }

  /**
   * Login as admin
   */
  async loginAsAdmin() {
    await this.navigate();
    await this.login('admin@smartparking.com', 'Admin@123');
  }

  /**
   * Get current URL after action
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Check if error message is visible
   */
  async isErrorVisible() {
    try {
      await this.errorMessage.waitFor({ state: 'visible', timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get error message text
   */
  async getErrorText() {
    try {
      return await this.errorMessage.textContent();
    } catch {
      return null;
    }
  }

  /**
   * Clear localStorage (simulate logged-out state)
   */
  async clearSession() {
    await this.page.evaluate(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    });
  }

  /**
   * Check if user is logged in (token in localStorage)
   */
  async isLoggedIn() {
    return await this.page.evaluate(() => {
      return !!localStorage.getItem('token');
    });
  }
}

module.exports = { LoginPage };
