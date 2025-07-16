const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

const { performLogin } = require("../utils/auth-utils");

async function logoutTest() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("https://my-wallet-pi-mocha.vercel.app/");
    await driver.manage().window().maximize();
    await driver.sleep(2000);

    await performLogin(driver);
    await driver.sleep(2000);

    await driver.findElement(
      By.xpath('//*[@id="root"]/div/div/div/aside/div/nav/div/a[9]')
    ).click();
    driver.sleep(5000);
    
    await driver.findElement(
      By.xpath('//*[@id="root"]/div/div/div/div[1]/div/div/div/button')
    ).click();
    await driver.sleep(2000);

    const currentUrl = await driver.getCurrentUrl();
    assert.equal(
      currentUrl,
      "https://my-wallet-pi-mocha.vercel.app/login",
      "Logout was not successful"
    );
  } catch (error) {
    console.error("An error occurred during the test:", error);
  } finally {
    await driver.quit();
  }
}

logoutTest();
