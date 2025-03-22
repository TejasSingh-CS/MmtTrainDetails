import { Page } from '@playwright/test';
import { StationSelector } from './StationSelector';
import { TravelDateSelector } from './TravelDateSelector';
import { expect } from '@playwright/test';

interface TrainDetails {
    name: string | null;
    number: string | null;
    departure: string | null;
    arrival: string | null;
    departureTime: string | null;
    arrivalTime: string | null;
  }

export class TrainsPage {
  private page: Page;
  private stationSelector: StationSelector;
  private travelDateSelector: TravelDateSelector;

  constructor(page: Page) {
    this.page = page;
    this.stationSelector = new StationSelector(page);
    this.travelDateSelector = new TravelDateSelector(page);
  }

  async selectStations(fromStationCode: string, toStationCode: string) {
    await this.stationSelector.selectStation("From", fromStationCode);
    await this.stationSelector.selectStation("To", toStationCode);
  }

  async selectTravelDate(targetDate: string) {
    await this.travelDateSelector.selectTravelDate(targetDate);
  }

  async searchTrains() {
    await this.page.locator("//a[@data-cy='submit']").dblclick();
  }

  async verifyCities(fromCityId: string, toCityId: string) {
    await this.page.locator(`#${fromCityId}`).waitFor({ state: 'visible' });
    await this.page.locator(`#${toCityId}`).waitFor({ state: 'visible' });
  }

  async grabTrainDetails() {
    const trainData: TrainDetails[] = [];  // <-- Type the array here
    const trainNameSelectors = this.page.locator("//p[@data-testid='train-name']");
    const trainNumberSelectors = this.page.locator("//p[@data-testid='listing-train-number']");
    const departureSelectors = this.page.locator("//p[@data-testid='departure-city']");
    const arrivalSelectors = this.page.locator("//p[@data-testid='arrival-city']");
    const timeSelectors = this.page.locator("//p[@class='appendBottom8']/span[@class='ListingCard_timeText__VVsOS ListingCard_latoBlack__g7ftF']");
    
    const trainCount = await trainNameSelectors.count();
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
    return trainData;
  }
  
}
