const { chromium } = require('playwright');

const newPage = async ({ headless, devtools }) => {
  const browser = await chromium.launch({ headless: headless, devtools: devtools });

  // Setup context however you like.
  const context = await browser.newContext({ /* pass any options */ });
  await context.route('**/*', route => route.continue());

  // Pause the page, and start recording manually.
  const page = await context.newPage();
  return {
    page: page,
    browser: browser
  };
}

const gotoPage = async (firstName, lastName, email, phone) => {

    let { page, browser } = await newPage({ headless: false, devtools: true });

     // Go to http://www.uw.olsztyn.pl/rezerwacje_cudzoziemcy/pokoj_A123.php
     await page.goto('http://www.uw.olsztyn.pl/rezerwacje_cudzoziemcy/pokoj_A123.php');
     // Check input[name="dane_osobowe"]
     await page.locator('input[name="dane_osobowe"]').check();
     // Click input[name="imie"]
     await page.locator('input[name="imie"]').click();
     // Fill input[name="imie"]
     await page.locator('input[name="imie"]').fill(firstName);
     // Press Tab
     await page.locator('input[name="imie"]').press('Tab');
     // Fill input[name="nazwisko"]
     await page.locator('input[name="nazwisko"]').fill(lastName);
     // Press Tab
     await page.locator('input[name="nazwisko"]').press('Tab');
     // Fill input[name="email"]
     await page.locator('input[name="email"]').fill(email);
     // Press Tab
     await page.locator('input[name="email"]').press('Tab');
     // Fill input[name="telefon"]
     await page.locator('input[name="telefon"]').fill(phone);
     return { page, browser };
}

const clickDateInput = async(page) => {
  await page.locator('input[name="datepicker"]').click();
}

const selectDay = async (page, day) => {
    await Promise.all([
        page.waitForResponse(response => response.url().includes('godziny_pokoj_A.php')),
        page.locator(`a:has-text("${day}")`).click()
    ]);
}

module.exports = {
    gotoPage,
    clickDateInput,
    selectDay
}