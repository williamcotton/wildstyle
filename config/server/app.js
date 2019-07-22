const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const enforce = require('express-sslify');
const cookieSession = require('cookie-session');
const csurf = require('csurf');
const path = require('path');

const nodeEnv = process.env.NODE_ENV;
const sessionSecret = process.env.SESSION_SECRET;
const defaultTitle = process.env.DEFAULT_TITLE;

const reactRendererMiddleware = require('./middleware/react-renderer');
const analyticsMiddleware = require('./middleware/analytics');
const expressLinkMiddleware = require('./middleware/express-link');
const spraypaintMiddleware = require('../browser/middleware/spraypaint');

const applicationController = require('../../app/view-controllers/application');
const appLayout = require('../../app/views/layout');
const { analyticsRouter } = require('../../app/analytics');

const cookieSessionOptions = {
  name: 'session',
  sameSite: 'lax'
};

module.exports = () => {
  const app = express();
  app.disable('x-powered-by');
  cookieSessionOptions.keys = [sessionSecret];
  if (nodeEnv === 'production') {
    app.set('trust proxy', 1);
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
    cookieSessionOptions.secure = true;
  }
  app.use(compression());
  app.use(express.static(path.join(__dirname, '/../../build')));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieSession(cookieSessionOptions));
  app.use(csurf());
  app.use(expressLinkMiddleware({ defaultTitle }));
  app.use(spraypaintMiddleware());
  app.use(reactRendererMiddleware({ appLayout }));
  app.use(analyticsMiddleware({ analyticsRouter, app }));
  return applicationController({ app });
};
