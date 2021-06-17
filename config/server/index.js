require('dotenv').config();

const nodeEnv = process.env.NODE_ENV;
const port = process.env.PORT || 5000;

const universalServerApp = require('./app')();

universalServerApp.listen(port, () => {
  console.log(
    'universalServerApp is running in %s mode on port %s',
    nodeEnv,
    port
  );
});
