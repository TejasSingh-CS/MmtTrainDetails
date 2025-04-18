export const Selectors = {
    MODAL_CLOSE: "//span[@class='commonModal__close']",
    TRAINS_MENU: "//li[@class='menu_Trains']//span[@data-cy='item-wrapper']",
    FROM_STATION: "//span[normalize-space()='From']",
    TO_STATION: "//span[normalize-space()='To']",
    DATE_INPUT: "//input[@id='travelDate']",
    SUBMIT_BUTTON: "//a[@data-cy='submit']",
    TRAIN_CARD: "[data-testid='listing-card']",
    TRAIN_NAME: "[data-testid='train-name']",
    TRAIN_NUMBER: "[data-testid='listing-train-number']",
    DEPARTURE_CITY: "[data-testid='departure-city']",
    ARRIVAL_CITY: "[data-testid='arrival-city']",
    CLASS_CARD: "[data-testid='card-wrapper']",
    CLASS_INFO: "[data-testid='class-info']",
    AVAILABILITY_INFO: "[data-testid='availability-text']",
    CITY_INPUT: (id: string) => `//input[@id='${id}']`,
    STATION_SEARCH: ".calc50",
    DATE_PICKER_NEXT: "//span[@aria-label='Next Month']"
  };