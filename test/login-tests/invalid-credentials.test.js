const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

async function loginWithInvalidCredentialsTest() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("https://my-wallet-pi-mocha.vercel.app/");
    await driver.manage().window().maximize();
    await driver.sleep(2000);

    const signInButton = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/div/div/div[2]/div/a[2]')), 2000);
    await signInButton.click();
    await driver.sleep(2000);

    // Enter invalid email and password
    await driver.findElement(By.id('email')).sendKeys("wrong@email.com");
    await driver.sleep(2000);
    await driver.findElement(By.id('password')).sendKeys("wrongpassword");
    await driver.sleep(2000);
    await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div/div/form/div[4]/button')).click();
    await driver.sleep(2000);

    // Wait for error message (adjust selector as needed)
    const errorElem = await driver.wait(
      until.elementLocated(By.xpath("//*[@id='root']/div/div/div/div/div/div/p[1]")), 
      5000
    );
    const errorText = await errorElem.getText();

    const currentUrl = await driver.getCurrentUrl();
    const homeUrl = "https://my-wallet-pi-mocha.vercel.app/home";

    // Assertion: error message should mention "invalid"
    assert.strictEqual(
      errorText, "Login failed"
    );
    assert.notEqual(currentUrl, homeUrl, "User should not be redirected to home page with invalid credentials");



    console.log("Invalid credentials test passed!");
  } catch (error) {
    console.error("Invalid credentials test failed:", error);
  } finally {
    await driver.quit();
  }
}

loginWithInvalidCredentialsTest();