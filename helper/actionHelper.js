const axios = require('axios').default;

const SWIPE_DIRECTION = {
  down: {
    start: { x: 50, y: 15 },
    end: { x: 50, y: 75 },
  },
  left: {
    start: { x: 95, y: 50 },
    end: { x: 5, y: 50 },
  },
  right: {
    start: { x: 5, y: 50 },
    end: { x: 95, y: 50 },
  },
  up: {
    start: { x: 50, y: 75 },
    end: { x: 50, y: 15 },
  },
};

module.exports = {
  // await this.swipeOnPercentage(
  //   this.calculateXY(SWIPE_DIRECTION.down.start, percentage),
  //   this.calculateXY(SWIPE_DIRECTION.down.end, percentage)
  // );

  calculateXY: (xy, percentage) => {
    const { x } = xy;
    const { y } = xy;
    return {
      x: x * percentage,
      y: y * percentage,
    };
  },

  swipeOnPercentage: async (from, to) => {
    const SCREEN_SIZE = await browser.getWindowSize();
    const pressOptions = module.exports.getDeviceScreenCoordinates(
      SCREEN_SIZE,
      from
    );
    const moveToScreenCoordinates = module.exports.getDeviceScreenCoordinates(
      SCREEN_SIZE,
      to
    );

    await module.exports.swipe(pressOptions, moveToScreenCoordinates);
  },

  swipe: async (from, to) => {
    console.log(`Move from:  ${JSON.stringify(from)}`);
    console.log(`Move to:  ${JSON.stringify(to)}`);
    browser.performActions([
      {
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
          {
            type: 'pointerMove',
            duration: 0,
            x: from.x,
            y: from.y,
          },
          // c. Finger comes down into contact with screen
          { type: 'pointerDown', button: 0 },
          // d. Pause for a little bit
          { type: 'pause', duration: 100 },
          // e. Finger moves to end position
          //    We move our finger from the center of the element to the
          //    starting position of the element.
          //    Play with the duration to make the swipe go slower / faster
          {
            type: 'pointerMove',
            duration: 1000,
            x: to.x,
            y: to.y,
          },
          // f. Finger gets up, off the screen
          { type: 'pointerUp', button: 0 },
        ],
      },
    ]);

    await browser.pause(1000);
  },

  getDeviceScreenCoordinates: (screenSize, coordinates) => {
    console.log(`screen width = ${screenSize.width}`);
    const temp = Math.round(screenSize.height * (coordinates.y / 100));
    console.log(`${screenSize.height} ${coordinates.y} = ${temp}`);
    const y = Math.round(screenSize.height * (coordinates.y / 100));
    const x = Math.round(screenSize.width * (coordinates.x / 100));

    return {
      x: x >= screenSize.width ? screenSize.width - 10 : x,
      y: y >= screenSize.height ? screenSize.height - 20 : y,
    };
  },

  swipeDown: async (percentage = 1) => {
    await module.exports.swipeOnPercentage(
      // SWIPE_DIRECTION.down.start,
      module.exports.calculateXY(SWIPE_DIRECTION.down.start, percentage),
      // SWIPE_DIRECTION.down.end,
      module.exports.calculateXY(SWIPE_DIRECTION.down.end, percentage)
    );
  },

  swipeUp: async (percentage = 1) => {
    await module.exports.swipeOnPercentage(
      module.exports.calculateXY(SWIPE_DIRECTION.up.start, percentage),
      module.exports.calculateXY(SWIPE_DIRECTION.up.end, percentage)
    );
  },

  swipeLeft: async (percentage = 1) => {
    await module.exports.swipeOnPercentage(
      // SWIPE_DIRECTION.left.start,
      module.exports.calculateXY(SWIPE_DIRECTION.left.start, percentage),
      // SWIPE_DIRECTION.left.end,
      module.exports.calculateXY(SWIPE_DIRECTION.left.end, percentage)
    );
  },

  swipeRight: async (percentage = 1) => {
    await module.exports.swipeOnPercentage(
      // SWIPE_DIRECTION.right.start,
      module.exports.calculateXY(SWIPE_DIRECTION.right.start, percentage),
      // SWIPE_DIRECTION.right.end,
      module.exports.calculateXY(SWIPE_DIRECTION.right.end, percentage)
    );
  },

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
    let response = '';
    await browser.call(async () => {
      try {
        response = await axios.post(url, data, { headers });
      } catch (err) {
        return err;
      }
    });
    return response;
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
    const x = await module.exports.getText(pageObject);
    for (let i = 0; i < x.length; i += 1) {
      pageObject.setValue('\uE003');
      await browser.pause(100);
    }
  },

  setText: async (pageObject, data) => {
    await module.exports.clearText(pageObject);
    await pageObject.setValue(data);
  },

  addText: async (pageObject, data) => {
    await pageObject.clearValue();
    await pageObject.addValue(`\uE003${data}\uE007`);
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
    waitTimeout = 2000
  ) => {
    if (waitTimeout > 0) {
      await $(pageObjectSelector).waitForDisplayed({
        timeout: waitTimeout,
        timeoutMsg: `getPageObject: Page object ${pageObjectSelector} not displayed in ${waitTimeout} milliseconds`,
      });
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
