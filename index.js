
const {gotoPage, clickDateInput, selectDay} = require('./page');
const fs = require('fs');
const cronJob = require('./cronJob');

const firstName = 'TestName'
const lastName = 'TestLastName'
const email = 'test@gmail.com'
const phone = '123456789'

async function selectDate(page) {

    //With script below and date parameter you can force always asking the same date.
    //Used only for test purpose. Can't be used for applying for later dates since its blocked in the backend.
    // const date = '2022-09-12'
    // const postScriptContent = fs.readFileSync('./postScript.txt', 'utf8')
    // await page.addScriptTag({content: postScriptContent})
    // await page.addScriptTag({content: `var date = ${date}`})

    await clickDateInput(page)
    const availableDates =  await (await page.locator('.ui-datepicker-calendar td[data-event="click"]').allInnerTexts())
    // availableDates.shift()
    for(let i=0; i<availableDates.length; i++) {
        if(i !== 0)
            await clickDateInput(page)
        await selectDay(page, availableDates[i])

        const radios = await page.locator('input[type="radio"]').count()
        if(radios > 0){
            const radioToClick = await page.locator('input[type="radio"]').first()
            const value = await radioToClick.evaluate(node => node.value);
            await page.locator(`label[for="${value}"]`).first().click()
            return true;
        }
    }

    return false
}

let selected = false

async function start() {

    if(selected){
        console.log('Abort job since available date has be found')
        return
    }
    let { page, browser } = await gotoPage(firstName, lastName, email, phone);
    try {
        selected = await selectDate(page)
        if(selected){
            console.log("Available date selected. Validate captcha and submit the form")
            await page.pause()
        }
    }
    finally {
        await browser.close()
    }
}

async function run() {
    cronJob.start(start)
}
run()