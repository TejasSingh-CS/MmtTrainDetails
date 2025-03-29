import { test, chromium, expect } from '@playwright/test';
import fs from 'fs';
const path = require('path');
import { Page } from '@playwright/test';
import { generateHTMLTable, TrainDetails, ClassDetails } from '../utils/htmlUtils'
import { selectTravelDate, selectStation, grabCity } from '../utils/trainUtils';
import credentials from '../utils/credentials.json';
//const testData = JSON.parse(JSON.stringify(require('../../utils/credentials.json')));

test('Open MakeMyTrip', async () => {
    test.setTimeout(60000);
    const browser = await chromium.launch({ headless: false, args: ['--ignore-certificate-errors'] });
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    const page = await context.newPage();

    await page.goto('https://www.makemytrip.com/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    const closeButton = page.locator("//span[@class='commonModal__close']");
    if (await closeButton.isVisible()) await closeButton.click();

    await page.locator("//li[@class='menu_Trains']//span[@data-cy='item-wrapper']").click();
    await page.waitForTimeout(2000);

    //Select From, To & Travel Date
    await selectStation(page, "From", credentials.From);
    await selectStation(page, "To", credentials.To);
    await selectTravelDate(page, credentials.Date);
    await page.waitForTimeout(1000);

    //Submit Button
    await page.locator("//a[@data-cy='submit']").dblclick();

    //Fetch From, To & Travel Date Information
    const fromCity = await grabCity(page, "fromCity", "From");
    const toCity = await grabCity(page, "toCity", "To");
    const formattedDate = credentials.Date;
    await grabCity(page, "fromCity", "From");
    await grabCity(page, "toCity", "To");

    //List of Train Cards
    const trainCards = await page.locator("[data-testid='listing-card']");
    const trainCount = await trainCards.count();
    
    const trainData: TrainDetails[] = [];

    for (let i = 0; i < trainCount; i++) {
        const trainCard = trainCards.nth(i);

        const trainDetails: TrainDetails = {
            name: await trainCard.locator("[data-testid='train-name']").textContent(),
            number: await trainCard.locator("[data-testid='listing-train-number']").textContent(),
            departure: await trainCard.locator("[data-testid='departure-city']").textContent(),
            arrival: await trainCard.locator("[data-testid='arrival-city']").textContent(),
            departureTime: (await trainCard.locator(".ListingCard_timeText__VVsOS.ListingCard_latoBlack__g7ftF").nth(0).textContent())?.replace(',', '').trim() ?? null,
            arrivalTime: (await trainCard.locator("[data-testid='arrival-time']").textContent())?.replace(',', '').trim() ?? null,
            classes: []
        };

        const classCards = await trainCard.locator("[data-testid='card-wrapper']");
        const classCount = await classCards.count();

        for (let j = 0; j < classCount; j++) {
            const classCard = classCards.nth(j);
            const classInfo = classCard.locator("[data-testid='class-info']");
            const availabilityInfo = classCard.locator("[data-testid='availability-text']");

            const classDetails: ClassDetails = {
                classType: await classInfo.count() > 0 ? (await classInfo.textContent()) ?? 'N/A' : 'N/A',
                availability: await availabilityInfo.count() > 0 ? (await availabilityInfo.textContent()) ?? 'Not Available' : 'Not Available'
            };

            if (classDetails.classType !== 'N/A') {
                trainDetails.classes.push(classDetails);
            }
        }

        trainData.push(trainDetails);
    }
    console.log(trainData);
    await browser.close();

    // Update the HTML generation call

    const htmlContent = generateHTMLTable(trainData, 
        fromCity, 
        toCity, 
        formattedDate);
    fs.writeFileSync('train_details.html', htmlContent);
    // Get the absolute path dynamically
const filePath = path.join(__dirname, 'train_details.html');

console.log(`Train details saved in ${filePath}`);
});