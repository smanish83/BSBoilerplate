const SearchPage = require('../../pageObjects/search/SearchPage');

const email = 'smanish83@gmail.com';
const pwd = 'Welcome@2022';
describe('User Account test', () => {
  it('Sign In and Sign out test', async () => {
    await SearchPage.open();
    await SearchPage.waitForInitialSearchLoad();

    await browser.signIn(email, pwd);
    await browser.pause(5000);
    await browser.signOut();
  });
});
