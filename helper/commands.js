const swipeDirection = {
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

const pageObject = {
  get getHamburgerButtonPO() {
    return (async () =>
      await Action.getPageObject(Selector.getByCv('headerMobileMenuOpen')))();
  },

  get getMenuWrapperPO() {
    return (async () =>
      await Action.getPageObject(Selector.getByCv('headerMobileMenuOpen')))();
  },

  get getSignInLinkPO() {
    return (async () =>
      await Action.getPageObject(
        '[data-qa=drawer-modal] [data-cv-test="headerMobileSignInLink"]'
      ))();
  },

  get getPasswordTextBoxPO() {
    return (async () =>
      await Action.getPageObject('[data-cv-test="sign-in-password"] input'))();
  },

  get getEmailTextBoxPO() {
    return (async () =>
      await Action.getPageObject('[data-cv-test="sign-in-email"] input'))();
  },

  get getSignInButtonPO() {
    return (async () =>
      await Action.getPageObject('[data-cv="sign-in-submit"]'))();
  },

  get getLoginModelPO() {
    return (async () =>
      await Action.getPageObject('[data-cv-test="Header.Modal"]', false, 0))();
  },

  get getSignInEmailTextBox() {
    return (async () =>
      await Action.getPageObject('[data-cv-test="sign-in-email"]', false, 0))();
  },

  get getprofileNamePO() {
    return (async () =>
      await Action.getPageObject(
        '[data-qa=drawer-modal] [data-qa="profile-name"]'
      ))();
  },

  get getSignOutPO() {
    return (async () => await Action.getPageObject('=SIGN OUT'))();
  },
};

async function clickHamburgerButton() {
  await Action.performClick(await pageObject.getHamburgerButtonPO);
}

async function waitForSignOutSuccessfully() {
  await Action.waitForDisplayBySelector(
    Selector.getByQa('menu-title-wrapper'),
    true,
    35000
  );
}

async function clickSignInLink() {
  await Action.performClick(await pageObject.getSignInLinkPO);
}

async function clickSignInButton() {
  await Action.performClick(await pageObject.getSignInButtonPO);
}

async function clickSignOutButton() {
  await Action.performClick(await pageObject.getSignOutPO);
}

async function clickProfileName() {
  await Action.performClick(await pageObject.getprofileNamePO);
}

async function enterPassword(pwd) {
  await Action.setText(await pageObject.getPasswordTextBoxPO, pwd);
}

async function enterEmail(email) {
  await Action.setText(await pageObject.getEmailTextBoxPO, email);
}
async function waitForLoginModelDisappear() {
  await Action.waitForDisplayBySelector(
    '[data-cv-test="sign-in-email"]',
    true,
    3500
  );
}

function calculateXY(xy, percentage) {
  const { x } = xy;
  const { y } = xy;
  return {
    x: x * percentage,
    y: y * percentage,
  };
}

function getDeviceScreenCoordinates(screenSize, coordinates) {
  const y = Math.round(screenSize.height * (coordinates.y / 100));
  const x = Math.round(screenSize.width * (coordinates.x / 100));

  return {
    x: x >= screenSize.width ? screenSize.width - 10 : x,
    y: y >= screenSize.height ? screenSize.height - 20 : y,
  };
}
async function swipe(from, to) {
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
        { type: 'pointerDown', button: 0 },
        { type: 'pause', duration: 100 },
        {
          type: 'pointerMove',
          duration: 1000,
          x: to.x,
          y: to.y,
        },
        { type: 'pointerUp', button: 0 },
      ],
    },
  ]);
  await browser.pause(1000);
}

async function swipeOnPercentage(from, to) {
  const screenSize = await browser.getWindowSize();
  const pressOptions = getDeviceScreenCoordinates(screenSize, from);
  const moveToScreenCoordinates = getDeviceScreenCoordinates(screenSize, to);

  await swipe(pressOptions, moveToScreenCoordinates);
}

module.exports = async function () {
  await browser.addCommand('swipeUp', async (percentage = 1) => {
    await swipeOnPercentage(
      calculateXY(swipeDirection.up.start, percentage),
      calculateXY(swipeDirection.up.end, percentage)
    );
  });

  await browser.addCommand('swipeDown', async (percentage = 1) => {
    await swipeOnPercentage(
      calculateXY(swipeDirection.down.start, percentage),
      calculateXY(swipeDirection.down.end, percentage)
    );
  });

  await browser.addCommand('swipeLeft', async (percentage = 1) => {
    await swipeOnPercentage(
      calculateXY(swipeDirection.left.start, percentage),
      calculateXY(swipeDirection.left.end, percentage)
    );
  });

  await browser.addCommand('swipeRight', async (percentage = 1) => {
    await swipeOnPercentage(
      calculateXY(swipeDirection.right.start, percentage),
      calculateXY(swipeDirection.right.end, percentage)
    );
  });

  browser.addCommand('signIn', async (email, password) => {
    await clickHamburgerButton();
    await clickSignInLink();
    await enterEmail(email);
    await enterPassword(password);
    await clickSignInButton();
    await waitForLoginModelDisappear();
    await browser.pause(5000);
  });

  browser.addCommand('signOut', async () => {
    await clickHamburgerButton();
    await clickProfileName();
    await clickSignOutButton();
    await browser.pause(1000);
    await waitForSignOutSuccessfully();
    await browser.pause(1000);
  });
};
