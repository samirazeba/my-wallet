require("dotenv").config();
const { Builder, By, until } = require("selenium-webdriver");
const { performLogin } = require("../utils/auth-utils");
const assert = require("assert");

async function loginTest() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Open the homepage
    await driver.get("https://my-wallet-pi-mocha.vercel.app/");
    driver.manage().window().maximize();
    await driver.sleep(3000);

    // Use the login function from utils
    const loginSuccess = await performLogin(driver);
    await driver.sleep(3000);

    const currentUrl = await driver.getCurrentUrl();

    assert.equal(currentUrl, "https://my-wallet-pi-mocha.vercel.app/home", "Login was not successful");
    if (!loginSuccess) {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error("An error occurred during the test:", error);
  } finally {
    await driver.quit();
  }
}

loginTest();