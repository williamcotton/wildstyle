const router = require('router')();
const h = require('react-hyperscript');
const e = require('../vendor/async-error');

router.get(
  '/',
  e(async (req, { renderApp }) => {
    renderApp(h('div', 'hello!'));
  })
);

module.exports = router;
