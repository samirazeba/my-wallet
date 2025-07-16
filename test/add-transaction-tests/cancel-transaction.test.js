require("dotenv").config();
const { Builder, By, until } = require("selenium-webdriver");
const { performLogin } = require("../utils/auth-utils");
const assert = require("assert");

async function cancelTransactionTest() {
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
      .to("https://my-wallet-pi-mocha.vercel.app/transactions");
    await driver.sleep(3000);

    await driver
      .findElement(
        By.xpath('//*[@id="root"]/div/div/div/div/div[3]/div[1]/button')
      )
      .click();
    await driver.sleep(2000);

    await driver.wait(
      until.elementLocated(
        By.xpath('//*[@id="headlessui-dialog-panel-«r6»"]/div')
      ),
      5000
    );

    const name = "New Test Transaction";
    await driver
      .findElement(By.name("name"))
      .sendKeys(name);
    await driver.sleep(1000);

    await driver
      .findElement(By.name("beneficiary"))
      .sendKeys("Test Beneficiary");
    await driver.sleep(1000);

    /*

    await driver.findElement(By.name("amount")).sendKeys("100");
    await driver.sleep(1000);

    await driver
      .findElement(
        By.xpath("//select[@name='category_id']/option[text()='Groceries']")
      )
      .click();
    await driver.sleep(2000);

    await driver
      .findElement(
        By.xpath("//select[@name='bank_account_id']/option[@value='2']")
      )
      .click();
    await driver.sleep(2000);

    await driver
      .findElement(By.name("description"))
      .sendKeys("Test Description");
    await driver.sleep(1000);

    */

    const cancelButton = await driver.wait(
      until.elementLocated(By.xpath("//button[normalize-space(text())='Cancel']")),
      10000
    );
    await driver.wait(until.elementIsVisible(cancelButton), 10000);
    await driver.wait(until.elementIsEnabled(cancelButton), 10000);
    await driver.executeScript("arguments[0].scrollIntoView(true);", cancelButton);
    await driver.sleep(500); // Wait for modal animation

    try {
      await cancelButton.click();
    } catch (e) {
      // Fallback to JS click if intercepted
      await driver.executeScript("arguments[0].click();", cancelButton);
    }

    const transactionName = await driver
      .findElement(
        By.xpath(
          '//*[@id="root"]/div/div/div/div/div[3]/div[2]/table/tbody/tr[1]/td[1]'
        )
      )
      .getText();

    console.log("Transaction Name:", transactionName);

    assert.notEqual(
      transactionName,
      name,
      "Transaction was not cancelled successfully"
    );
  } catch (error) {
    console.error("An error occurred during the test:", error);
  } finally {
    await driver.quit();
  }
}
cancelTransactionTest();
