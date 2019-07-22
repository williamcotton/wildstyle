require('isomorphic-fetch');
const { SpraypaintBase, attr } = require('spraypaint');

const schema = require('../../../build/schema.json');

const ApplicationRecord = SpraypaintBase.extend({
  static: {
    baseUrl: 'http://localhost:2000',
    apiNamespace: '/api/v1'
  }
});

const resources = schema.resources.reduce((_resources, resource) => {
  // eslint-disable-next-line no-param-reassign
  _resources[resource.name] = ApplicationRecord.extend({
    static: {
      jsonapiType: resource.type
    },
    attrs: Object.keys(resource.attributes).reduce((attrs, attrName) => {
      attrs[attrName] = attr(); // eslint-disable-line no-param-reassign
      return attrs;
    }, {})
  });
  return _resources;
}, {});

module.exports = () => {
  return (req, res, next) => {
    req.resources = resources;

    next();
  };
};
