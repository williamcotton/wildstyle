const router = require('router')();
const h = require('react-hyperscript');
const e = require('express-async-handler');

router.get(
  '/',
  e(async (req, { renderComponent }) => {
    renderComponent(h('div', 'hello!'));
  })
);

module.exports = router;
