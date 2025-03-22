import { Page } from '@playwright/test';

export class TravelDateSelector {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectTravelDate(targetDate: string) {
    await this.page.locator("//input[@id='travelDate']").click();
    while (true) {
      const dateLocator = this.page.getByRole('gridcell', { name: targetDate });
      const dateDisabledLocator = this.page.locator("//div[@aria-disabled='true']");
      if (await dateLocator.count() > 0 && await dateDisabledLocator.count() > 0) {
        await dateLocator.click();
        break;
      } else {
        const nextMonthButton = this.page.locator("//span[@aria-label='Next Month']");
        if (await nextMonthButton.count() === 0) {
          throw new Error("Next month button not found, target date unavailable");
        }
        await nextMonthButton.click();
        await this.page.waitForTimeout(500); // Allow UI update
      }
    }
  }
}
