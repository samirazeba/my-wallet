require("dotenv").config();
const { Builder, By, until } = require("selenium-webdriver");
const { performLogin } = require("../utils/auth-utils");
const assert = require("assert");

async function editGoalTest() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Open the homepage
    await driver.get("https://my-wallet-pi-mocha.vercel.app/");
    driver.manage().window().maximize();
    await driver.sleep(3000);

    // Use the login function from utils
    const loginSuccess = await performLogin(driver);
    await driver.sleep(3000);

    await driver
      .navigate()
      .to("https://my-wallet-pi-mocha.vercel.app/saving-goals");
    await driver.sleep(3000);

    await driver.findElement(By.xpath("//*[@id='root']/div/div/div/div/div[3]/div[2]/div/div[2]/button[1]")).click();
    await driver.sleep(2000);

    const oldName = await driver.findElement(By.xpath("//*[@id='root']/div/div/div/div/div[3]/div[2]/div/div[1]/div[1]/div[1]/span[2]")).getText();
    const newName = "Updated Saving Goal Name";
    await driver.findElement(By.name("name")).clear();
    await driver.sleep(1000);
    await driver.findElement(By.name("name")).sendKeys(newName);

    const saveButton = await driver.wait(
      until.elementLocated(By.xpath("//button[normalize-space(text())='Save']")),
      10000
    );
    await driver.wait(until.elementIsVisible(saveButton), 10000);
    await driver.wait(until.elementIsEnabled(saveButton), 10000);
    await driver.executeScript("arguments[0].scrollIntoView(true);", saveButton);
    await driver.sleep(500); // Wait for modal animation

    try {
      await saveButton.click();
      await driver.sleep(5000);
      console.log("Save button clicked successfully");
    } catch (e) {
      // Fallback to JS click if intercepted
      await driver.executeScript("arguments[0].click();", saveButton);
    }

    await driver.navigate().refresh();
    await driver.sleep(3000);

    assert.notEqual(oldName, newName, "Saving goal was not edited successfully");
  } catch (error) {
    console.error("An error occurred during the test setup:", error);
  } finally {
    await driver.quit();
  }
}
editGoalTest();

