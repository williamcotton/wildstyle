/* global window, document */

const qs = require('qs');

const { clientRequest } = window;

const { defaultTitle } = clientRequest;

module.exports = () => (req, res, next) => {
  Object.keys(clientRequest).forEach(key => (req[key] = clientRequest[key])); // eslint-disable-line no-return-assign

  req.renderDocument = ({ title }) => {
    document.querySelector('title').innerText = title || defaultTitle; // eslint-disable-line no-param-reassign
    return { appContainer: document.querySelector('#app') };
  };

  res.navigate = (path, query) => {
    const pathname = query ? `${path}?${qs.stringify(query)}` : path;
    res.redirect(pathname);
  };

  res.redirect = res.redirect.bind(res);

  next();
};
