const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const enforce = require('express-sslify');
const cookieSession = require('cookie-session');
const csurf = require('csurf');

const reactRendererMiddleware = require('./middleware/react-renderer');
const analyticsMiddleware = require('./middleware/analytics');
const userAuthentication = require('./middleware/user-authentication');
const clientRequestMiddleware = require('./middleware/client-request');

const applicationController = require('../../app/view-controllers/application');
const appLayout = require('../../app/views/layout');
const { analyticsRouter } = require('../../app/analytics');

const cookieSessionOptions = {
  name: 'session',
  sameSite: 'lax'
};

module.exports = ({
  defaultTitle,
  buildDir,
  nodeEnv,
  sessionSecret,
  githubClientId,
  githubSecret
}) => {
  const app = express();
  app.disable('x-powered-by');
  cookieSessionOptions.keys = [sessionSecret];
  if (nodeEnv === 'production') {
    app.set('trust proxy', 1);
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
    cookieSessionOptions.secure = true;
  }
  app.use(compression());
  app.use(express.static(buildDir));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(clientRequestMiddleware());
  app.use(cookieSession(cookieSessionOptions));
  app.use(userAuthentication({ githubClientId, githubSecret, app }));
  app.use(csurf());
  app.use(reactRendererMiddleware({ defaultTitle, appLayout }));
  app.use(analyticsMiddleware({ analyticsRouter, app }));
  return applicationController({ app });
};
