const router = require('router')();
const h = require('react-hyperscript');
const e = require('express-async-handler');
const { useContext } = require('react');

const { RequestContext } = require('../contexts');

const ProductComponent = product => {
  const { Link, baseUrl } = useContext(RequestContext);
  return h('.product', [
    h('h4', [h(Link, { href: `${baseUrl}/${product.id}` }, product.title)]),
    h('p', product.description)
  ]);
};

const ReviewComponent = review =>
  h('.review', [h('h5', review.title), h('p', review.body)]);

const Input = ({ name }) =>
  h('input', {
    type: 'input',
    name,
    id: name
  });

const TextArea = ({ name }) => h('textarea', { name, id: name });

router.get(
  '/',
  e(async ({ r: { ProductResource }, hydrate }, { renderComponent }) => {
    const products = await hydrate(ProductResource.includes('reviews').all());
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

const AddReviewComponent = product => {
  const { Form, baseUrl } = useContext(RequestContext);
  return h(
    Form,
    { action: `${baseUrl}/${product.id}/review`, method: 'post' },
    [
      h('label', { htmlFor: 'title' }, 'Title'),
      h(Input, { name: 'title' }),
      h('label', { htmlFor: 'body' }, 'Body'),
      h(TextArea, { name: 'body' }),
      h('button.submit', 'Submit')
    ]
  );
};

router.post(
  '/:id/review',
  e(async ({ params: { id }, body, r: { ReviewResource } }, { redirect }) => {
    const review = new ReviewResource(body);
    review.product_id = id;
    try {
      await review.save();
    } catch (error) {
      console.error(error);
    }
    redirect('back');
  })
);

router.get(
  '/:id',
  e(async ({ params: { id }, r: { ProductResource } }, { renderComponent }) => {
    const response = await ProductResource.includes('reviews').find(id);
    const product = response.data;
    renderComponent(
      h('div.product-page', [
        h('.details', [h(ProductComponent, product)]),
        h('h4.reviews-title', 'Reviews'),
        h('ol.reviews', [
          product.reviews.map(review =>
            h('li', { key: review.id }, [h(ReviewComponent, review)])
          )
        ]),
        h(AddReviewComponent, product)
      ])
    );
  })
);

module.exports = router;
