/* global window, document */

const { fetch, clientRequest } = window;

const querySelector = selectors => document.querySelector(selectors);

const universalBrowserApp = require('./app')({
  fetch,
  querySelector,
  clientRequest
});

universalBrowserApp.listen({}, () => {
  console.log(
    '%cuniversalBrowserApp is running on %s',
    'color:blue; font-size: 6pt',
    window.location.host
  );
});
