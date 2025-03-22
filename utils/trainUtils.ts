import { Page, expect } from '@playwright/test';

// Function to select travel date dynamically
export async function selectTravelDate(page: Page, targetDate: string) {
    await page.locator("//input[@id='travelDate']").click(); // Open date picker

    while (true) {
        const dateLocator = page.getByRole('gridcell', { name: targetDate });
        const dateDisabledLocator = page.locator("//div[@aria-disabled='true']");
        if (await dateLocator.count() > 0 && await dateDisabledLocator.count() > 0) {
            await dateLocator.click();
            break;
        } else {
            const nextMonthButton = page.locator("//span[@aria-label='Next Month']");
            if (await nextMonthButton.count() === 0) {
                throw new Error("Next month button not found, target date unavailable");
            }
            await nextMonthButton.click();
            await page.waitForTimeout(500); // Allow UI update
        }
    }
}

// Function to select station (from/to)
export async function selectStation(page: Page, label: string, stationCode: string) {
    await page.locator(`//span[normalize-space()='${label}']`).click();
    await page.waitForTimeout(3000);
    await page.getByPlaceholder(label).fill(stationCode);
    await page.waitForTimeout(3000);
    await page.locator(".calc50").first().click();
    await page.waitForTimeout(1000);
}

// Function to get From/To city name
export async function grabCity(page: Page, cityId: string, cityType: string) {
    // Wait for the input field to be visible
    const citySelector = page.locator(`//input[@id='${cityId}']`);
    await expect(citySelector).toBeVisible({ timeout: 40000 });
    // Get input value
    const cityText = await citySelector.inputValue();
    console.log(`${cityType}: ${cityText}`); // Logs the city name dynamically
}
