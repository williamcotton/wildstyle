const router = require('router')();
const h = require('react-hyperscript');
const e = require('../vendor/async-error');

const Product = require('../resources/product');

router.get(
  '/',
  e(async (req, { renderApp }) => {
    const response = await Product.all();
    const products = response.data;
    const buildProduct = product =>
      h('li', { key: product.id }, [
        h('h4', product.title),
        h('p', product.description)
      ]);
    renderApp(h('ol', [products.map(buildProduct)]));
  })
);

module.exports = router;
