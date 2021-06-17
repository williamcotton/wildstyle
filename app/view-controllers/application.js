const frontPage = require('./front-page');
const products = require('./products');
const error = require('./error');

module.exports = ({ app }) => {
  app.use('/', frontPage);
  app.use('/products', products);
  app.use(error);
  return app;
};
