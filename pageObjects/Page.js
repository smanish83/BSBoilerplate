/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
module.exports = class Page {
  /**
   * Opens a sub page of the page
   * @param path path of the sub page (e.g. /path/to/page.html)
   */
  async open(input) {
    const { path = '', delay = 5000, exist } = input;
    const baseUrl = 'https://www.carvana.com';
    return await browser.url(`${baseUrl}/${path}`).then(async () => {
      await browser.pause(delay);

      if (exist) {
        await Action.getPageObject(exist);
      }
    });
  }
};
