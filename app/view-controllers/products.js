const router = require('router')();
const h = require('react-hyperscript');
const e = require('express-async-handler');
const { useContext } = require('react');

const { RequestContext } = require('../contexts');

const ProductComponent = product => {
  const { Link, baseUrl } = useContext(RequestContext);
  return h('.review', [
    h('h4', [h(Link, { href: `${baseUrl}/${product.id}` }, product.title)]),
    h('p', product.description)
  ]);
};

router.get(
  '/',
  e(async ({ r: { ProductResource } }, { renderComponent }) => {
    const response = await ProductResource.all();
    const products = response.data;
    renderComponent(
      h('ol', [
        products.map(product =>
          h('li', { key: product.id }, [h(ProductComponent, product)])
        )
      ])
    );
  })
);

router.get(
  '/edit/:id',
  e(async ({ params: { id }, r: { ProductResource } }, { renderComponent }) => {
    const response = await ProductResource.find(id);
    const product = response.data;
    renderComponent(h(ProductComponent, product));
  })
);

router.get(
  '/:id',
  e(async ({ params: { id }, r: { ProductResource } }, { renderComponent }) => {
    const response = await ProductResource.find(id);
    const product = response.data;
    renderComponent(h(ProductComponent, product));
  })
);

module.exports = router;
