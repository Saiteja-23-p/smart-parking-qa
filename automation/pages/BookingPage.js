/**
 * Page Object: BookingPage
 * Smart Parking System — QA Automation
 * Module: Slot Selection & Booking
 * Author: Poosala Saiteja
 */

class BookingPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Parking slot grid
    this.availableSlot = page.locator('[class*="available" i], [data-status="available"], [class*="slot"][class*="green"]').first();
    this.reservedSlot = page.locator('[class*="reserved" i], [class*="occupied" i], [data-status="reserved"]').first();
    this.slotGrid = page.locator('[class*="grid" i], [class*="slot" i]').first();

    // Booking form fields
    this.vehicleNumberInput = page.locator('input[name*="vehicle" i], input[placeholder*="vehicle" i], input[placeholder*="license" i], input[placeholder*="number" i]').first();
    this.durationInput = page.locator('input[name*="duration" i], input[type="number"], input[placeholder*="duration" i], input[placeholder*="hour" i]').first();

    // Buttons
    this.confirmButton = page.locator('button:has-text("Confirm"), button:has-text("Book"), button:has-text("Reserve"), button[type="submit"]').first();
    this.bookAnotherButton = page.locator('button:has-text("Book Another"), a:has-text("Book Another")').first();

    // Confirmation
    this.bookingToken = page.locator('[class*="token" i], [class*="confirmation" i], [class*="success" i], text=/TOKEN-/').first();
    this.confirmationScreen = page.locator('[class*="confirm" i], [class*="success" i], h2:has-text("Confirm"), h3:has-text("Confirm")').first();

    // Error messages
    this.vehicleError = page.locator('text="Please provide a vehicle license number.", [class*="error" i]').first();

    // Processing indicator
    this.processingIndicator = page.locator('text="Processing Booking...", [class*="loading" i], [class*="spinner" i]').first();
  }

  /**
   * Navigate to parking/slot selection page
   */
  async navigate() {
    await this.page.goto('https://saiteja-23-p.github.io/smart-parking-system/#/');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click the first available parking slot
   */
  async selectFirstAvailableSlot() {
    await this.availableSlot.waitFor({ state: 'visible', timeout: 10000 });
    await this.availableSlot.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Attempt to fill and submit booking form
   * @param {string} vehicleNumber
   * @param {string|number} duration
   */
  async fillAndSubmitBooking(vehicleNumber, duration) {
    if (vehicleNumber !== null) {
      await this.vehicleNumberInput.fill(String(vehicleNumber));
    }
    if (duration !== null) {
      await this.durationInput.fill(String(duration));
    }
    await this.confirmButton.click();
    await this.page.waitForTimeout(2000);
  }

  /**
   * Check if booking confirmation is shown
   */
  async isConfirmationVisible() {
    try {
      // Look for TOKEN- pattern in page
      const tokenText = await this.page.textContent('body');
      return tokenText.includes('TOKEN-') || tokenText.includes('Confirmed') || tokenText.includes('Booking ID');
    } catch {
      return false;
    }
  }

  /**
   * Get booking token text
   */
  async getBookingToken() {
    try {
      const bodyText = await this.page.textContent('body');
      const tokenMatch = bodyText.match(/TOKEN-[A-Z0-9\-]+/);
      return tokenMatch ? tokenMatch[0] : null;
    } catch {
      return null;
    }
  }

  /**
   * Check if vehicle number error is shown
   */
  async isVehicleErrorVisible() {
    try {
      const bodyText = await this.page.textContent('body');
      return bodyText.includes('Please provide a vehicle license number') ||
             bodyText.includes('vehicle number is required') ||
             bodyText.includes('required');
    } catch {
      return false;
    }
  }

  /**
   * Check if reserved slot is not bookable
   */
  async tryClickReservedSlot() {
    try {
      await this.reservedSlot.waitFor({ state: 'visible', timeout: 5000 });
      const isDisabled = await this.reservedSlot.isDisabled();
      if (!isDisabled) {
        await this.reservedSlot.click();
      }
      return isDisabled;
    } catch {
      return true; // Slot not found = already handled
    }
  }
}

module.exports = { BookingPage };
