import { Builder, By } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

export default async function handler(req, res) {
  const { browser, testUrl } = req.body; // Get testUrl from the request body
  let driver;

  try {
    const options = new chrome.Options();
    // options.addArguments('--headless'); // Uncomment for headless mode

    driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();

    await driver.get(testUrl); // Use the provided testUrl
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
    if (driver) {
      await driver.quit();
    }
  }
}

// The config object goes *after* the handler function:
export const config = {
    api: {
      bodyParser: {
        sizeLimit: '1mb', // Adjust as needed
      },
    },
  };