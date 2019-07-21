const qs = require('qs');

const defaultTitle = process.env.DEFAULT_TITLE;

const styleTag = '<link rel="stylesheet" href="/app.css" />';
const scriptTag =
  '<script src="/app.js" type="text/javascript" charset="utf-8"></script>';
const metaViewportTag =
  '<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"/>';

const renderDocument = ({ clientRequest }) => ({ renderedContent, title }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  ${metaViewportTag}
  <title>${title || defaultTitle}</title>
  ${styleTag}
  <script type="text/javascript" charset="utf-8">
    window.clientRequest = ${JSON.stringify(clientRequest)};
  </script>
</head>
<body>
  <div id="app">${renderedContent}</div>
  ${scriptTag}
</body>
</html>
`;

module.exports = () => (req, res, next) => {
  req.csrf = req.csrfToken();

  res.clientRequest = {
    csrf: req.csrf,
    defaultTitle
  };

  req.renderDocument = ({ renderedContent, title }) =>
    renderDocument({ clientRequest: res.clientRequest })({
      renderedContent,
      title
    });

  res.navigate = (path, query) => {
    const pathname = query ? `${path}?${qs.stringify(query)}` : path;
    res.redirect(pathname);
  };

  res.redirect = res.redirect.bind(res);

  next();
};
