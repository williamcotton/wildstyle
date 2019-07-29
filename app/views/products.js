const h = require('react-hyperscript');
const { useContext } = require('react');

const { RequestContext } = require('../contexts');

const ProductComponent = product => {
  const { Link, baseUrl } = useContext(RequestContext);
  return h('.content', [
    h('.header', [
      h(Link, { href: `${baseUrl}/${product.id}` }, `${product.title}`)
    ]),
    h('.description', product.description)
  ]);
};

exports.ProductComponent = ProductComponent;

const ReviewComponent = review =>
  h('.content', [h('.text', review.title), h('.text', review.body)]);

exports.ReviewComponent = ReviewComponent;

const AddReviewComponent = product => {
  const { Form, baseUrl } = useContext(RequestContext);
  return h(
    Form,
    {
      action: `${baseUrl}/${product.id}/review`,
      method: 'post',
      className: 'ui form'
    },
    [
      h('.field', [
        h('label', { htmlFor: 'title' }, 'Title'),
        h('input', { type: 'input', name: 'title' })
      ]),
      h('.field', [
        h('label', { htmlFor: 'body' }, 'Body'),
        h('textarea', { name: 'body' })
      ]),
      h('button.ui.button', { type: 'submit' }, 'Submit')
    ]
  );
};

exports.AddReviewComponent = AddReviewComponent;
