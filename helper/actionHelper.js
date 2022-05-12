const axios = require('axios').default;

module.exports = {
  performClick: async (pageObject, waitTimeout = 20000) => {
    if (waitTimeout > 0) {
      await pageObject.waitForClickable({
        timeout: waitTimeout,
      });
    }
    await pageObject.click();
  },

  waitForExist: async (pageObject, waitTimeout = 20000) => {
    await pageObject.waitForExist({
      timeout: waitTimeout,
    });
  },

  waitForDisplayBySelector: async (
    pageObject,
    visible = false,
    waitTimeout = 20000
  ) => {
    try {
      const elem = await $(pageObject);

      return await elem.waitForDisplayed({
        timeout: waitTimeout,
        reverse: visible,
      });
    } catch (NoSuchElementException) {
      return visible;
    }
  },

  waitForDisplayed: async (
    pageObject,
    visible = false,
    waitTimeout = 20000
  ) => {
    try {
      return await pageObject.waitForDisplayed({
        timeout: waitTimeout,
        reverse: visible,
      });
    } catch (NoSuchElementException) {
      return visible;
    }
  },

  removeLineBreaks: (string) => string.replace(/(\r\n|\n|\r)/gm, ' '),

  postApiRequest: async (url, data, headers = {}) => {
    let res = '';
    await browser.call(async () => {
      await axios
        .post(url, data)
        .then((response) => {
          res = response;
        })
        .catch((error) => {
          res = error;
        });
    });
    return res;
  },

  getApiRequest: async (url, headers = {}) => {
    let response = '';
    await browser.call(async () => {
      try {
        response = await axios.get(url, { headers });
      } catch (err) {
        return err;
      }
    });
    return response;
  },

  clearText: async (pageObject) => {
    const value = await module.exports.getText(pageObject);
    const backSpaces = new Array(value.length).fill('Backspace');
    await pageObject.setValue(backSpaces);
    await browser.pause(100);
  },

  clearSpecialCharacters: async (pageObject) => {
    let value = await module.exports.getText(pageObject);
    const conditions = ['_', '/', '@'];
    while (
      // eslint-disable-next-line no-loop-func
      conditions.some((el) => value.charAt(value.length - 1).includes(el))
    ) {
      await module.exports.keystrock(pageObject, 'Backspace');
      value = await module.exports.getText(pageObject);
    }
  },

  keystrock: async (pageObject, key, repeate = 1) => {
    let unicode = '';
    switch (key) {
      case 'Backspace':
        unicode = '\uE003';
        break;
      case 'Clear':
        unicode = '\uE005';
        break;
      case 'Escape':
        unicode = '\uE00C';
        break;
      case 'ArrowLeft':
        unicode = '\uE012';
        break;
      case 'ArrowUp':
        unicode = '\uE013';
        break;
      case 'ArrowRight':
        unicode = '\uE014';
        break;
      case 'ArrowDown':
        unicode = '\uE015';
        break;
      default:
        unicode = '\uE000';
    }

    for (let index = 0; index < repeate; index += 1) {
      await browser.elementSendKeys(pageObject.elementId, unicode);
    }
  },

  setText: async (pageObject, data) => {
    await module.exports.clearText(pageObject);
    await pageObject.setValue(data);
  },

  addText: async (pageObject, data, clear = true) => {
    if (clear) {
      await pageObject.clearValue();
    }
    await pageObject.addValue(`${data}\uE007`);
  },

  getText: async (pageObject) => {
    let textValue = await pageObject.getText();
    if (textValue === null || textValue === undefined || textValue === '') {
      textValue = await pageObject.getValue();
    }
    return textValue;
  },

  getHTML: async (pageObject) => await pageObject.getHTML(),

  scrollToView: async (pageObject) => {
    await pageObject.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'start',
    });
    await browser.pause(500);
  },

  isPageObjectVisible: async (pageObject) => await pageObject.isDisplayed(),

  isPageObjectExisting: async (pageObject) => await pageObject.isExisting(),

  getPageObject: async (
    pageObjectSelector,
    matchAll = false,
    waitTimeout = 20000
  ) => {
    if (waitTimeout > 0) {
      try {
        const element = await $(pageObjectSelector);
        await element.waitForDisplayed({
          timeout: waitTimeout,
          timeoutMsg: `getPageObject: Page object ${pageObjectSelector} not displayed in ${waitTimeout} milliseconds`,
        });
      } catch (NoSuchElementException) {
        return NoSuchElementException;
      }
    }
    if (!matchAll) {
      return await $(pageObjectSelector);
    }
    return await $$(pageObjectSelector);
  },

  getPageURL: async (browser, waitTimeout = 20000) => {
    await browser.waitUntil(async () => await browser.getUrl(), waitTimeout);
  },

  setBrowserLocation: async (browser, lat, long) => {
    await browser.execute(async () => {
      window.navigator.geolocation.getCurrentPosition = function (success) {
        const position = {
          coords: {
            latitude: lat,
            longitude: long,
          },
        };
        success(position);
      };
    });
  },
};
