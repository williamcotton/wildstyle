const express = require('browser-express');

const reactRendererMiddleware = require('./middleware/react-renderer');
const analyticsMiddleware = require('./middleware/analytics');

const { analyticsRouter } = require('../../app/analytics');

const applicationController = require('../../app/view-controllers/application');
const appLayout = require('../../app/views/layout');

module.exports = ({ fetch, querySelector, clientRequest }) => {
  const app = express();
  app.use(
    reactRendererMiddleware({
      app,
      querySelector,
      appLayout,
      clientRequest
    })
  );
  app.use(analyticsMiddleware({ analyticsRouter, fetch }));
  const universalBrowserApp = applicationController({ app });
  return universalBrowserApp;
};
