const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    // Navigate to Power Apps page
    await driver.get('https://org82e3564c.crm11.dynamics.com/main.aspx?appid=2600964d-7cde-ee11-904d-000d3a0b8b2b');

    // Wait for the form to load
    await driver.wait(until.elementLocated(By.id('formId')), 10000); // Adjust the ID as needed

    // Check the visibility of the sections
    let feasibilityStatus = await driver.findElement(By.id('pir_feasibilitystatus')).getAttribute('value'); // Adjust the ID as needed

    if (feasibilityStatus === '892250000' || feasibilityStatus === '892250001') {
      let buildSectionVisible = await driver.findElement(By.id('Build')).isDisplayed(); // Adjust the ID as needed
      let scopeSectionVisible = await driver.findElement(By.id('Scope')).isDisplayed(); // Adjust the ID as needed

      console.log('Build Section Visible:', buildSectionVisible);
      console.log('Scope Section Visible:', scopeSectionVisible);
    }

    // Additional interactions can be added here

  } finally {
    await driver.quit();
  }
})();
