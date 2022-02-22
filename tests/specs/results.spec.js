const SearchPage = require('../../pageObjects/search/SearchPage');



describe('Page load test', () => {
  it('Open home page test', async () => {
    await SearchPage.open();
    await SearchPage.waitForInitialSearchLoad();
  });
});

