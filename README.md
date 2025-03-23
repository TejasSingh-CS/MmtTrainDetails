# MakeMyTrip Train Schedule Scraper

Automated tool to fetch and display train schedules from MakeMyTrip.com

## Features
- Scrapes train schedules between two stations
- Displays class availability information
- Generates formatted HTML reports
- Uses hardcoded credentials for consistency
- Built with Playwright for reliable browser automation

## Installation
```bash
git clone https://github.com/your-username/makemytrip-train-scraper.git
cd makemytrip-train-scraper
npm install
```

## Use this command to run
npx playwright test --headed

Output
- Generates train_details.html with:
- Train schedule information
- Class availability status
- Formatted table layout
![image](https://github.com/user-attachments/assets/d337859f-bf0d-48e7-896b-571a10cbb14d)

## Usage Cmd
  npx playwright test
    Runs the end-to-end tests.

  npx playwright test --ui
    Starts the interactive UI mode.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test example
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

  npx playwright codegen
    Auto generate tests with Codegen.

We suggest that you begin by typing:

    npx playwright test

    npx playwright show-report

    npx playwright test orangehrm.spec.ts --debug

    npx playwright test orangehrm.spec.ts --ui

    npx playwright test mmt_train.spec.ts --headed

    Task

    1 - Handle current date time.
        a) By default Current date time 
        b) If user has to pass through cmd
    2 - No Hardcoded Source & Destination station
        a) Need way to pass argument through cmd
        b) Create JSON and pass through JSON & also mention all types of City in Train Code
    3 - Check View Port Size
