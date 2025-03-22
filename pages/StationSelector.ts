import { Page } from '@playwright/test';

export class StationSelector {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectStation(label: string, stationCode: string) {
    await this.page.locator(`//span[normalize-space()='${label}']`).click();
    await this.page.getByPlaceholder(label).fill(stationCode);
    await this.page.locator(".calc50").first().click();
  }
}
