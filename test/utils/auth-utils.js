require("dotenv").config();
const { By, until } = require("selenium-webdriver");
exports.performLogin = async (driver, email=process.env.EMAIL,  password=process.env.PASSWORD) => {
  try {
    await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/div/div/div[2]/div/a[2]')), 3000);
    await driver.sleep(3000);

    // Click the login button
    await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div[2]/div/a[2]')).click();
    await driver.sleep(3000);

    //login form
    await driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div/div/div/div")), 3000);
    await driver.sleep(3000);

    // Enter email
    await driver.findElement(By.id("email")).sendKeys(email);
    await driver.sleep(3000);

    // Enter password
    await driver.findElement(By.id("password")).sendKeys(password);
    await driver.sleep(3000);

    // Click the login button
    await driver.findElement(By.xpath("//*[@id='root']/div/div/div/div/div/div/form/div[4]/button")).click();
    await driver.sleep(3000);
    

    // Wait for the homepage to load after login
    await driver.wait(until.urlIs("https://my-wallet-pi-mocha.vercel.app/home"), 20000);
    await driver.sleep(3000);

    console.log("Login successful!");
    return true;
  } catch (err) {
    console.error("Login failed:", err);
    return false;
  }
};