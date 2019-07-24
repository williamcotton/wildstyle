require('isomorphic-fetch');
const { SpraypaintBase, attr } = require('spraypaint');

const schema = require('../../../build/schema.json');

module.exports = ({ baseUrl }) => {
  const ApplicationRecord = SpraypaintBase.extend({
    static: {
      baseUrl,
      apiNamespace: '/api/v1'
    }
  });

  const resources = schema.resources.reduce(
    (allResources, resource) =>
      Object.assign(allResources, {
        [resource.name]: ApplicationRecord.extend({
          static: {
            jsonapiType: resource.type
          },
          attrs: Object.keys(resource.attributes).reduce(
            (attrs, attrName) => Object.assign(attrs, { [attrName]: attr() }),
            {}
          )
        })
      }),
    {}
  );
  return (req, res, next) => {
    req.r = resources;

    next();
  };
};
