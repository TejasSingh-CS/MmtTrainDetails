import { Page } from '@playwright/test';

export class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo() {
    await this.page.goto('https://www.makemytrip.com/', { waitUntil: 'domcontentloaded' });
  }

  async closeModalIfPresent() {
    const closeButton = this.page.locator("//span[@class='commonModal__close']");
    if (await closeButton.isVisible()) await closeButton.dblclick();
  }

  async openTrainsSection() {
    await this.page.locator("//li[@class='menu_Trains']//span[@data-cy='item-wrapper']").click();
  }
}
