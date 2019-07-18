/* global window, document */

const { fetch, queryCache, defaultTitle, clientRequest } = window;

const querySelector = selectors => document.querySelector(selectors);

const universalBrowserApp = require('./app')({
  fetch,
  queryCache,
  querySelector,
  defaultTitle,
  clientRequest
});

universalBrowserApp.listen({}, () => {
  console.log(
    '%cuniversalBrowserApp is running on %s',
    'color:blue; font-size: 6pt',
    window.location.host
  );
});
