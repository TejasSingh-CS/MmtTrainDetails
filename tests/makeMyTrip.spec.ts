import { test, chromium, expect } from '@playwright/test';
import fs from 'fs';
import { generateHTMLTable } from '../utils/htmlUtils';
import { selectTravelDate, selectStation, grabCity } from '../utils/trainUtils';

test('Open MakeMyTrip', async () => {
    test.setTimeout(60000); // Increase timeout to 60s
    const browser = await chromium.launch({ headless: false, args: ['--ignore-certificate-errors'] });
    const context = await browser.newContext({
        ignoreHTTPSErrors: true,
    });

    const page = await context.newPage();

    await page.goto('https://www.makemytrip.com/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Close modal if present
    const closeButton = page.locator("//span[@class='commonModal__close']");
    if (await closeButton.isVisible()) await closeButton.dblclick();

    await page.locator("//li[@class='menu_Trains']//span[@data-cy='item-wrapper']").click();
    await page.waitForTimeout(2000);

    // Select station 
    await selectStation(page, "From", "ST");
    await selectStation(page, "To", "BRC");

    // Select travel date
    await selectTravelDate(page, "Thu Mar 27");
    await page.waitForTimeout(1000);

    // Click Search
    await page.locator("//a[@data-cy='submit']").dblclick();
    
    await grabCity(page, "fromCity", "From");
    await grabCity(page, "toCity", "To");

    // Extract train details
    const trainNameSelectors = page.locator("//p[@data-testid='train-name']");
    const trainNumberSelectors = page.locator("//p[@data-testid='listing-train-number']");
    const departureSelectors = page.locator("//p[@data-testid='departure-city']");
    const arrivalSelectors = page.locator("//p[@data-testid='arrival-city']");
    const timeSelectors = page.locator("//p[@class='appendBottom8']/span[@class='ListingCard_timeText__VVsOS ListingCard_latoBlack__g7ftF']");

    const trainCount = await trainNameSelectors.count();
    
    const trainData: {
        name: string | null;
        number: string | null;
        departure: string | null;
        arrival: string | null;
        departureTime: string | null;
        arrivalTime: string | null;
    }[] = [];

    for (let i = 0; i < trainCount; i++) {
        trainData.push({
            name: await trainNameSelectors.nth(i).textContent(),
            number: await trainNumberSelectors.nth(i).textContent(),
            departure: await departureSelectors.nth(i).textContent(),
            arrival: await arrivalSelectors.nth(i).textContent(),
            departureTime: (await timeSelectors.nth(i * 2).textContent())?.replace(',', '').trim() ?? null,
            arrivalTime: (await timeSelectors.nth(i * 2 + 1).textContent())?.replace(',', '').trim() ?? null
        });
    }
    console.log(trainData);
    await browser.close();

    // Generate and save the HTML table
    const htmlContent = generateHTMLTable(trainData);
    fs.writeFileSync('train_details.html', htmlContent);
    console.log('Train details saved in train_details.html');
});
