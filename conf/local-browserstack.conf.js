const _ = require('lodash');

const defaults = require('./shared.conf');
const BrowserStack = require('./BrowserStack');

const overrides = {
  services: [
    [
      BrowserStack,
      {
        browserStackUser: 'manishsandbhor_UOm3V2',
        browserStackKey: 'HhiWaTGgM2MpCp21hrtt',
        project: "boilerplate",
        build: `
          boilerplate
        -${new Date().toLocaleString()}`,
      },
    ],
  ],
  capabilities: [
    {
      os_version: '15',
      device: 'iPhone 13 Pro',
      browserName: 'safari',
      real_mobile: 'true',
      name: 'iOS_15_iPhone_13_Pro_Safari',
    },
    {
      os_version: '14',
      device: 'iPhone 12 Pro Max',
      browserName: 'safari',
      real_mobile: 'true',
      name: 'iOS_14_iPhone_12_Pro_Max_Safari',
    },
    {
      os_version: "9.0",
      device: "Google Pixel 3",
      browserName: 'chrome',
      real_mobile: 'true',
    },
  ],
  reporters: [
    'spec',
    [
      'junit',
      {
        outputDir: './reports/junit-results',

        outputFileFormat(options) {
          const device = `${options.cid}_${options.capabilities.device.replace(
            / /g,
            ''
          )}_${options.capabilities.os_version}_${options.capabilities.browserName
            }`;
          return options.capabilities.sessionName
            ? `${options.capabilities.sessionName.replace(
              /\./g,
              '_'
            )}_${device}.xml`
            : `${device}.xml`;
        },
      },
    ],
  ],
};

exports.config = _.defaultsDeep(overrides, defaults.config);
