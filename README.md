# MmtTrainDetails

Inside that directory, you can run several commands:

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