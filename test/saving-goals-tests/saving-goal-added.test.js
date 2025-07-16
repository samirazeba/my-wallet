require("dotenv").config();
const { Builder, By, until } = require("selenium-webdriver");
const { performLogin } = require("../utils/auth-utils");
const assert = require("assert");

async function savingGoalAddedTest() {
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

    await driver.findElement(By.xpath("//*[@id='root']/div/div/div/div/div[3]/div[1]/button[1]")).click();
    await driver.sleep(2000);

    //await driver.wait(until.elementLocated(By.xpath("//*[@id='headlessui-dialog-panel-«re»']/div")), 5000);

    const name = "Test Saving Goal";
    await driver.findElement(By.name('name')).sendKeys(name);
    await driver.sleep(1000);

    await driver.findElement(By.name('target_amount')).sendKeys("1000");
    await driver.sleep(1000);

    await driver.findElement(By.name('target_date')).sendKeys("09/09/2025");
    await driver.sleep(1000);

    await driver.findElement(By.name('goal_description')).sendKeys("Test Description");
    await driver.sleep(1000);

    const addButton = await driver.wait(
      until.elementLocated(By.xpath("//*[@id='headlessui-dialog-panel-«r6»']/div/form/div/button[2]")),
      10000
    );
    await driver.wait(until.elementIsVisible(addButton), 10000);
    await driver.wait(until.elementIsEnabled(addButton), 10000);
    await driver.executeScript("arguments[0].scrollIntoView(true);", addButton);
    await driver.sleep(500); // Wait for modal animation

    try {
      await addButton.click();
      console.log("Add button clicked successfully");
    } catch (e) {
      // Fallback to JS click if intercepted
      await driver.executeScript("arguments[0].click();", addButton);
    }

    const aiResponse = await driver.findElement(By.xpath("//*[@id='root']/div/div/div/div/div[3]/div[2]/div/div[1]/div[4]")).getText();

    assert.equal(aiResponse, "AI response:", "Saving goal was not added successfully");

    const savingGoalName = await driver.findElement(By.xpath("//*[@id='root']/div/div/div/div/div[3]/div[2]/div/div[1]/div[1]/div[1]/span[2]")).getText();

    assert.equal(savingGoalName, name, "Saving goal name was not added successfully");


  } catch (error) {
    console.error("An error occurred during the test setup:", error);
  } finally {
    await driver.quit();
  }
}
savingGoalAddedTest();

