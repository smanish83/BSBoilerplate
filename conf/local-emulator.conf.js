const _ = require('lodash');
const defaults = require('./shared.conf');

const errors = ':';
const overrides = {
  runner: 'local',
  port: 4723,
  capabilities: [
    {
      browserName: 'safari',
      platformName: 'iOS',
      platformVersion: '15.0',
      deviceName: 'iPhone 13',
      app: 'safari',
    },
  ],
  reporters: ['spec'],
  baseUrl: 'http://localhost',
  services: [
    'selenium-standalone',
    ['appium', { args: { relaxedSecurity: true }, command: 'appium' }],
  ],
  async afterTest(test, context, {
 error, result, duration, passed, retries 
}) {
    if (!passed) {
      actual = error
        .toString()
        .replace(
          /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
          ''
        )
        .replace(/\W/g, ' ');
    }
  },
};

exports.config = _.defaultsDeep(overrides, defaults.config);
