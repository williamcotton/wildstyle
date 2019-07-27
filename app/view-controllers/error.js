const h = require('react-hyperscript');

module.exports = (error, req, { renderComponent }, next) => {
  console.error(error);
  // let errorMessage = 'Sorry, something went horribly wrong!';
  let statusCode = 500;
  if (error.message === 'record not found') {
    // errorMessage = "This page isn't here!";
    statusCode = 404;
  }
  renderComponent(h('div.error', error.message), { statusCode });
  next();
};
