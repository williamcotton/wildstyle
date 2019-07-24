const express = require('browser-express');

const expressLinkMiddleware = require('./middleware/express-link');
const reactRendererMiddleware = require('./middleware/react-renderer');
const analyticsMiddleware = require('./middleware/analytics');
const spraypaintMiddleware = require('./middleware/spraypaint');

const { analyticsRouter } = require('../../app/analytics');

const applicationController = require('../../app/view-controllers/application');
const appLayout = require('../../app/views/layout');

module.exports = () => {
  const app = express();
  app.use(expressLinkMiddleware());
  app.use(spraypaintMiddleware({ baseUrl: '' }));
  app.use(reactRendererMiddleware({ app, appLayout }));
  app.use(analyticsMiddleware({ analyticsRouter }));
  const universalBrowserApp = applicationController({ app });
  return universalBrowserApp;
};
