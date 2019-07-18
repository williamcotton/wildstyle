require('dotenv').config();

const path = require('path');

const nodeEnv = process.env.NODE_ENV;
const defaultTitle = process.env.DEFAULT_TITLE;
const port = process.env.PORT || 5000;
const sessionSecret = process.env.SESSION_SECRET;
const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubSecret = process.env.GITHUB_SECRET;

const buildDir = path.join(__dirname, '/../../build');

const universalServerApp = require('./app')({
  defaultTitle,
  buildDir,
  nodeEnv,
  sessionSecret,
  githubClientId,
  githubSecret
});

universalServerApp.listen(port, () => {
  console.log(
    'universalServerApp is running in %s mode on port %s',
    nodeEnv,
    port
  );
});
