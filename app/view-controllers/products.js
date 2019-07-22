const router = require('router')();
const h = require('react-hyperscript');
const e = require('express-async-handler');

const ProductComponent = product =>
  h('li', { key: product.id }, [
    h('h4', product.title),
    h('p', product.description)
  ]);

router.get(
  '/',
  e(async ({ resources: { ProductResource } }, { renderComponent }) => {
    const response = await ProductResource.all();
    const products = response.data;
    renderComponent(h('ol', [products.map(ProductComponent)]));
  })
);

router.get(
  '/edit/:id',
  e(
    async (
      { params: { id }, resources: { ProductResource } },
      { renderComponent }
    ) => {
      const response = await ProductResource.find(id);
      const product = response.data;
      renderComponent(ProductComponent(product));
    }
  )
);

module.exports = router;
