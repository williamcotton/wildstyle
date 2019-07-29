const router = require('router')();
const h = require('react-hyperscript');
const e = require('express-async-handler');

const {
  ProductComponent,
  ReviewComponent,
  AddReviewComponent
} = require('../views/products');

router.get(
  '/',
  e(async ({ r: { ProductResource }, hydrate }, { renderComponent }) => {
    const products = await hydrate(ProductResource.includes('reviews').all());
    renderComponent(
      h('.ui.cards', [
        products.map(product => h('.ui.card', [h(ProductComponent, product)]))
      ])
    );
  })
);

router.get(
  '/:id/edit',
  e(async ({ params: { id }, r: { ProductResource } }, { renderComponent }) => {
    const response = await ProductResource.find(id);
    const product = response.data;
    renderComponent(h(ProductComponent, product));
  })
);

router.patch(
  '/:id',
  e(async ({ params: { id }, body, r: { ProductResource } }, { redirect }) => {
    const product = new ProductResource({ id, ...body });
    await product.save();
    redirect('back');
  })
);

router.post(
  '/:id/review',
  e(async ({ params: { id }, body, r: { ReviewResource } }, { redirect }) => {
    const review = new ReviewResource(body);
    review.product_id = id;
    await review.save();
    redirect('back');
  })
);

router.get(
  '/:id',
  e(async ({ params: { id }, r: { ProductResource } }, { renderComponent }) => {
    const response = await ProductResource.includes('reviews').find(id);
    const product = response.data;
    renderComponent(
      h('.ui.card', [
        h(ProductComponent, product),
        h('.content', [
          h('h4.ui.header', 'Reviews'),
          h('.ui.comments', [
            product.reviews.map(review =>
              h('.comment', { key: review.id }, [h(ReviewComponent, review)])
            )
          ]),
          h(AddReviewComponent, product)
        ])
      ])
    );
  })
);

module.exports = router;
