/**
 * Page Object: DashboardPage
 * Smart Parking System — QA Automation
 * Module: User Dashboard
 * Author: Poosala Saiteja
 */

class DashboardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Dashboard sections
    this.activeBookingsSection = page.locator('text="Active Bookings", [class*="active" i][class*="booking" i], h2:has-text("Active"), h3:has-text("Active")').first();
    this.bookingHistory = page.locator('text="Recent Parking History Logs", text="Booking History", [class*="history" i]').first();
    this.emptyHistoryMessage = page.locator('text="No recent active booking logs recorded."').first();
    this.searchInput = page.locator('input[placeholder*="Search booking" i], input[placeholder*="search" i]').first();
    this.logoutButton = page.locator('button:has-text("Logout"), button:has-text("Log Out"), button:has-text("Sign Out"), a:has-text("Logout")').first();

    // User info
    this.userRole = page.locator('text=/ROLE_USER/, text=/ROLE_ADMIN/, [class*="role" i]').first();
    this.fastagsStatus = page.locator('text="Fastag Status", [class*="fastag" i]').first();
    this.gateStatus = page.locator('text="Gate Status", [class*="gate" i]').first();

    // Cancel slot button
    this.cancelSlotButton = page.locator('button:has-text("Cancel Slot"), button:has-text("Cancel Booking")').first();
  }

  /**
   * Navigate to dashboard
   */
  async navigate() {
    await this.page.goto('https://saiteja-23-p.github.io/smart-parking-system/#/dashboard');
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1500);
  }

  /**
   * Check if dashboard is loaded (user is authenticated)
   */
  async isDashboardLoaded() {
    const url = this.page.url();
    const isOnDashboard = url.includes('/dashboard');
    if (!isOnDashboard) return false;

    // Check for dashboard content
    try {
      const bodyText = await this.page.textContent('body');
      return bodyText.includes('Active') || bodyText.includes('Dashboard') || bodyText.includes('Booking');
    } catch {
      return false;
    }
  }

  /**
   * Check if redirected to login (unauthorized access)
   */
  async isRedirectedToLogin() {
    await this.page.waitForTimeout(2000);
    const url = this.page.url();
    return url.includes('/login') || url.includes('#/login');
  }

  /**
   * Perform logout
   */
  async logout() {
    await this.logoutButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.logoutButton.click();
    await this.page.waitForTimeout(1500);
  }

  /**
   * Check localStorage after logout
   */
  async isSessionCleared() {
    return await this.page.evaluate(() => {
      return !localStorage.getItem('token') && !localStorage.getItem('user');
    });
  }

  /**
   * Search for a booking record
   * @param {string} query
   */
  async searchBooking(query) {
    await this.searchInput.fill(query);
    await this.page.waitForTimeout(1000);
  }

  /**
   * Get current localStorage token
   */
  async getToken() {
    return await this.page.evaluate(() => localStorage.getItem('token'));
  }
}

module.exports = { DashboardPage };
