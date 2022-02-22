const Action = require('../helper/actionHelper');
const Selector = require('../helper/elementSelectorHelper');
const Cookie = require('../helper/cookieHelper');
const Commands = require('../helper/commands');


global.Cookie = Cookie;
global.Action = Action;
global.Selector = Selector;

exports.config = {
  updateJob: false,
  specs: ['./tests/specs/**/*.js'],
  services: [],
  exclude: [],

  suites: {
    search: ['./tests/specs/integration/SmokeTests/Results/*.spec.js'],
    keywordsearch: [
      './tests/specs/integration/SmokeTests/KeywordSearch/*.spec.js',
    ],
    facetsui: ['./tests/specs/integration/SmokeTests/Facets-UI/*.spec.js'],
  },

  maxInstances: 25,
  logLevel: 'warn',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 60000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  host: 'hub-cloud.browserstack.com',

  framework: 'mocha',
  reporters: [],
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
    retries: 0,
  },
  async before(capabilities, specs, browser) {
    Commands();
  },
};
