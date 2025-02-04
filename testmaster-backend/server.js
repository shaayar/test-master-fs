"use server";
const express = require('express');
const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome'); // Import for Chrome options

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.post('/api/run-test', async (req, res) => {
    const { browser } = req.body;
    let driver;

    try {
        const options = new chrome.Options();
        // options.addArguments('--headless'); // Uncomment for headless mode if needed

        driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();

        await driver.get('https://www.example.com'); // Replace with your test URL
        const title = await driver.getTitle();

        const result = {
            testName: "Example Title Test",
            status: title === "Example Domain" ? "Passed" : "Failed",
        };

        res.status(200).json({ result });

    } catch (error) {
        console.error("Selenium test error:", error);
        res.status(500).json({ error: 'Test execution failed' });
    } finally {
        if (driver) {  // Check if the driver exists before quitting
            await driver.quit();
        }
    }
});

app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
});