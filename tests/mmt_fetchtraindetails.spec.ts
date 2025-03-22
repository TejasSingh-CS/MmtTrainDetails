import { test, chromium, expect } from '@playwright/test';
import fs from 'fs';



// Function to generate an HTML table from train details
function generateHTMLTable(trainData) {
    let tableContent = `
        <html>
        <head>
            <title>Train Details</title>
            <style>
                table { border-collapse: collapse; width: 100%; }
                th, td { border: 1px solid black; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
            </style>
        </head>
        <body>
            <h2>Train Details</h2>
            <table>
                <tr>
                    <th>#</th>
                    <th>Train Name</th>
                    <th>Train Number</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Departure Time</th>
                    <th>Arrival Time</th>
                </tr>
    `;

    trainData.forEach((train, index) => {
        tableContent += `
            <tr>
                <td>${index + 1}</td>
                <td>${train.name}</td>
                <td>${train.number}</td>
                <td>${train.departure}</td>
                <td>${train.arrival}</td>
                <td>${train.departureTime}</td>
                <td>${train.arrivalTime}</td>
            </tr>
        `;
    });

    tableContent += `
            </table>
        </body>
        </html>
    `;
    return tableContent;
}

// Function to select travel date dynamically
async function selectTravelDate(page, targetDate) {
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
async function selectStation(page, label, stationCode) {
    await page.locator(`//span[normalize-space()='${label}']`).click();
    await page.waitForTimeout(3000);
    await page.getByPlaceholder(label).fill(stationCode);
    await page.waitForTimeout(3000);
    await page.locator(".calc50").first().click();
    await page.waitForTimeout(1000);
}

//Function to get From/To city name
async function grabCity(page, cityId, cityType) {
    // Wait for the input field to be visible
    const citySelector = page.locator(`//input[@id='${cityId}']`);
    await expect(citySelector).toBeVisible({ timeout: 40000 });
    // Get input value
    const cityText = await citySelector.inputValue();
    console.log(`${cityType}: ${cityText}`); // Logs the city name dynamically
}

test('Open MakeMyTrip', async () => {
    test.setTimeout(60000); // Increase timeout to 60s
    const browser = await chromium.launch({ headless: false, args: ['--ignore-certificate-errors'] });
    const context = await browser.newContext({
        ignoreHTTPSErrors: true,
        //viewport: { width: 1280, height: 720 },  // Set a general viewport size (width x height)
    });

    const page = await context.newPage();

    await page.goto('https://www.makemytrip.com/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Close modal if present
    const closeButton = page.locator("//span[@class='commonModal__close']");
    if (await closeButton.isVisible()) await closeButton.dblclick();

    await page.locator("//li[@class='menu_Trains']//span[@data-cy='item-wrapper']").click();
    await page.waitForTimeout(2000);

    // select station 
    await selectStation(page, "From", "ST");
    await selectStation(page, "To", "BRC");

    // Select travel date
    await selectTravelDate(page, "Thu Mar 27");
    await page.waitForTimeout(1000);

    //Click Search
    await page.locator("//a[@data-cy='submit']").dblclick();
    //await page.waitForTimeout(20000);
    //await expect(page).toHaveURL(/listing/);

    await grabCity(page, "fromCity", "From");
    await grabCity(page, "toCity", "To");

    const trainNameSelectors = page.locator("//p[@data-testid='train-name']");
    const trainNumberSelectors = page.locator("//p[@data-testid='listing-train-number']");
    const departureSelectors = page.locator("//p[@data-testid='departure-city']");
    const arrivalSelectors = page.locator("//p[@data-testid='arrival-city']");


    const trainCount = await trainNameSelectors.count();
    const timeSelectors = page.locator("//p[@class='appendBottom8']/span[@class='ListingCard_timeText__VVsOS ListingCard_latoBlack__g7ftF']");

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
