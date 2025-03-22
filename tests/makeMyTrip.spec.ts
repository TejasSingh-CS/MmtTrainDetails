import { test, chromium } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { TrainsPage } from '../pages/TrainsPage';
import fs from 'fs';
import { generateHTMLTable } from '../utils/htmlUtils';

test('Open MakeMyTrip and fetch train details', async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const homePage = new HomePage(page);
  const trainsPage = new TrainsPage(page);

  await homePage.navigateTo();
  await homePage.closeModalIfPresent();

  await homePage.openTrainsSection();
  
  // Select stations and date
  await trainsPage.selectStations("ST", "BRC");
  await trainsPage.selectTravelDate("Thu Mar 27");

  // Click search
  await trainsPage.searchTrains();

  // Verify cities
  await trainsPage.verifyCities("fromCity", "toCity");

  // Fetch train details
  const trainData = await trainsPage.grabTrainDetails();

  // Generate and save HTML
  const htmlContent = generateHTMLTable(trainData);
  fs.writeFileSync('train_details.html', htmlContent);
  console.log('Train details saved in train_details.html');

  await browser.close();
});
