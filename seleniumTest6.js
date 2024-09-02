const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    // Navigate to Power Apps page
    await driver.get('https://org82e3564c.crm11.dynamics.com/main.aspx?appid=2600964d-7cde-ee11-904d-000d3a0b8b2b');

    // Wait for the form to load
    await driver.wait(until.elementLocated(By.id('formId')), 10000); // Adjust the ID as needed

    // Simulate attribute change event
    await driver.executeScript(() => {
      var executionContext = { getFormContext: () => Xrm.Page }; // Adjust as needed
      Unhidedeliver.attributeOnChange(executionContext);
    });

    // Check the visibility of the sections
    let deliverSectionVisible = await driver.findElement(By.id('Deliver')).isDisplayed(); // Adjust the ID as needed
    let scopeSectionVisible = await driver.findElement(By.id('Scope')).isDisplayed(); // Adjust the ID as needed
    let buildSectionVisible = await driver.findElement(By.id('Build')).isDisplayed(); // Adjust the ID as needed
    let evaluateSectionVisible = await driver.findElement(By.id('Evaluate')).isDisplayed(); // Adjust the ID as needed

    console.log('Deliver Section Visible:', deliverSectionVisible);
    console.log('Scope Section Visible:', scopeSectionVisible);
    console.log('Build Section Visible:', buildSectionVisible);
    console.log('Evaluate Section Visible:', evaluateSectionVisible);

  } finally {
    await driver.quit();
  }
})();
