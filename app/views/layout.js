const h = require('react-hyperscript');

const { RequestContext } = require('../contexts');

const AppLayout = ({ content, req }) => {
  const { Link } = req;
  return h(RequestContext.Provider, { value: req }, [
    h('.ui.container', [
      h('.ui.header', [
        h('h1', [h(Link, { href: '/' }, 'Wildstyle')]),
        h('nav', [h(Link, { href: '/products' }, 'Products')])
      ]),
      h('div.content', [content]),
      h('footer', [h('pre', [])])
    ])
  ]);
};

module.exports = AppLayout;
