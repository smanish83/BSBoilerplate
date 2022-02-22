const browserstack = require('browserstack-local');
const { v4: uuidv4 } = require('uuid');

let errors = '';
const localIdentifier = uuidv4();
const commonCapabilities = {
  'browserstack.debug': false,
  'browserstack.video': true,
  'browserstack.networkLogs': true,
  'browserstack.local': true,
  'browserstack.console': 'errors',
  'browserstack.localIdentifier': localIdentifier,
  'browserstack.selenium_version': '3.141.59',
  'browserstack.idleTimeout': 180,
  name:
    // eslint-disable-next-line global-require
    require('minimist')(process.argv.slice(2))['bstack-session-name'] ||
    'default_name',
  acceptInsecureCerts: true,
};

module.exports = class BrowserStack {
  constructor(options, capabilities, config) {
    // this.msHelper = new MobileSessionsHelper({
    //   environment: options.environment || 'uat',
    // });
    this.msRetryInterval = options.mobileSessionsRetryInterval || 5000;
    this.msTimeout = options.mobileSessionsTimeout || 300000;
    this.user = options.browserStackUser;
    this.key = options.browserStackKey;

    config.user = options.browserStackUser;
    config.key = options.browserStackKey;
    config.connectionRetryTimeout = this.msTimeout;
    config.connectionRetryCount = 0;

    commonCapabilities.build = options.build || `smoke-${new Date().toLocaleString()}`;

    commonCapabilities.project = options.project || 'Browserstack automation test';
  }

  async onPrepare(config, capabilities) {
    // try {
    //   this.token = await this.msHelper.init();
    //   this.tokenExpiration = this.msHelper.tokenExpiration;
    // } catch (e) {
    //   throw new SevereServiceError(
    //     `Failed to initialize MobileSessions Helper: ${e}`
    //   );
    // }

    capabilities.forEach((caps) => {
      for (const i in commonCapabilities) {
        caps[i] = caps[i] || commonCapabilities[i];
      }
    });

    console.log(
      `Starting BrowserStack Local with localIdentifier ${localIdentifier}`
    );
    await new Promise((resolve, reject) => {
      this.bs_local = new browserstack.Local();
      this.bs_local.start(
        {
          key: this.key,
          localIdentifier,
          'include-hosts':
            '.*.carvana.* .*.carvanatech.com connectivitycheck.gstatic.com www.google.com',
        },

        (error) => {
          if (error) return reject(error);
          console.log(
            `BrowserStack Local started with localIdentifier ${localIdentifier}`
          );
          resolve();
        }
      );
    });
  }

  async before(capabilities, specs, browser) {
    this.specFilePath = specs[0];
  }

  // eslint-disable-next-line no-unused-vars
  async afterTest(test, context, {
    error, result, duration, passed, retries
  }) {
    const specFileName = /[^/]*$/.exec(this.specFilePath)[0];
    await browser.executeScript(
      `browserstack_executor: {"action": "setSessionName", "arguments": {"name":"${specFileName}" }}`,
      []
    );

    if (passed && errors.length < 1) {
      await browser.executeScript(
        'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Assertions passed"}}',
        []
      );
    } else {
      if (error !== undefined) {
        await browser.takeScreenshot();

        error = error
          .toString()
          .replace(
            // eslint-disable-next-line no-control-regex
            /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
            ''
          )
          .replace(/\W/g, ' ');

        errors = `${errors} ${error}`.substring(0, 255);
      }
      await browser.executeScript(
        `browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "${errors}"}}`,
        []
      );
    }
  }

  async beforeSuite(suite) {
    // Set session name to file being run
    const specFile = suite.file.replace(/^.*[\\/]/, '');
    await browser.executeScript(
      `browserstack_executor: {"action": "setSessionName", "arguments": {"name":"${specFile}"}}`,
      []
    );
  }

  async onComplete() {
    return new Promise((resolve, reject) => {
      this.bs_local.stop(() => {
        console.log('Binary stopped');
        resolve();
      });
    });
  }
};
