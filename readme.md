# Purpose
This repository contains application in Node.JS automating visa application in Olsztyn UW. Full automation is not possible due to captcha used on site. Script checks if there are any available dates for visa application appointment. If any are found polling stops and waits for user CAPTCHa input. First available date is selected.

# How to run
1. Install Node.JS
2. Run `npm install`
3. In `index.js` fill your data: FirstName, LastName, Email and Phone number.
4. Start script with `npm start`. You should have browser opening every 10 seconds until available date is found.