module.exports = {
  createCookie: async (name, value, days) => {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toGMTString()}`;
    }

    await browser.setCookies([
      {
        name,
        value,
        expiry: expires,
      },
    ]);
  },

  createBulkCookies: async (value, cookies) => {
    for (i = 0; i < cookies.length; i += 1) {
      await module.exports.createCookie(cookies[i], value);
    }
  },

  readCookie: async (name) => {
    const cookie = await browser.getCookies([name]);
    if (cookie.length !== 0) {
      return cookie[0].value;
    }
    return undefined;
  },

  eraseCookie: async (name) => {
    await browser.deleteCookies(name);
  },
};
