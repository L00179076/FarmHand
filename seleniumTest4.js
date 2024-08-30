const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // Navigate to Power Apps page
    await driver.get('https://org82e3564c.crm11.dynamics.com/main.aspx?appid=2600964d-7cde-ee11-904d-000d3a0b8b2b');

    // Wait for the form to load
    await driver.wait(until.elementLocated(By.id('formId')), 10000); // Adjust the ID as needed

    // Simulate form save event
    await driver.executeScript(() => {
      var executionContext = { getFormContext: () => Xrm.Page }; // Adjust as needed
      PreventFieldChange.onSave(executionContext);
    });

    // Check if the fields are disabled
    let feasibilityStatusDisabled = await driver.findElement(By.id('pir_feasibilitystatus')).getAttribute('disabled'); // Adjust the ID as needed
    let proceedBuildDisabled = await driver.findElement(By.id('pir_proceedwithbuild')).getAttribute('disabled'); // Adjust the ID as needed

    console.log('Feasibility Status Disabled:', feasibilityStatusDisabled);
    console.log('Proceed with Build Disabled:', proceedBuildDisabled);

  } finally {
    await driver.quit();
  }
})();
