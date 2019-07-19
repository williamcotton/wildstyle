const router = require('router')();
const h = require('react-hyperscript');
const e = require('express-async-handler');

const Product = require('../resources/product');

const ProductComponent = product =>
  h('li', { key: product.id }, [
    h('h4', product.title),
    h('p', product.description)
  ]);

router.get(
  '/',
  e(async (req, { renderApp }) => {
    const response = await Product.all();
    const products = response.data;
    renderApp(h('ol', [products.map(ProductComponent)]));
  })
);

router.get(
  '/edit/:id',
  e(async ({ params: { id } }, { renderApp }) => {
    const response = await Product.find(id);
    const product = response.data;
    renderApp(ProductComponent(product));
  })
);

module.exports = router;
