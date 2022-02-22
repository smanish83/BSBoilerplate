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
  await Action.waitForDisplayed(await pageObject.getMenuWrapperPO);
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
  await Action.waitForDisplayed(
    await pageObject.getSignInEmailTextBox,
    true,
    35000
  );
}

module.exports = async function () {
  browser.addCommand('signIn', async (email, password) => {
    await clickHamburgerButton();
    await clickSignInLink();
    await enterEmail(email);
    await enterPassword(password);
    await clickSignInButton();
    await waitForLoginModelDisappear();
  });

  browser.addCommand('signOut', async () => {
    await clickHamburgerButton();
    await clickProfileName();
    await clickSignOutButton();
  });
};
