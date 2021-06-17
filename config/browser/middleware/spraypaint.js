require('isomorphic-fetch');
const {
  SpraypaintBase,
  attr,
  hasMany,
  belongsTo,
  hasOne
} = require('spraypaint');

const { camelize } = require('inflected');

const schema = require('../../../public/api/v1/schema');

module.exports = ({ baseUrl }) => {
  const ApplicationRecord = SpraypaintBase.extend({
    static: {
      baseUrl,
      apiNamespace: '/api/v1'
    }
  });

  const resources = schema.resources.reduce((allResources, resource) => {
    const attributes = Object.keys(resource.attributes).reduce(
      (attrs, attrName) =>
        Object.assign(attrs, { [camelize(attrName, false)]: attr() }),
      {}
    );

    const relationships = Object.keys(resource.relationships).reduce(
      (attrs, relationshipName) => {
        const { type } = resource.relationships[relationshipName];
        return Object.assign(attrs, {
          [camelize(relationshipName, false)]:
            // eslint-disable-next-line no-nested-ternary
            type === 'has_many'
              ? hasMany()
              : // eslint-disable-next-line no-nested-ternary
              type === 'belongs_to'
              ? belongsTo()
              : type === 'has_one'
              ? hasOne()
              : ''
        });
      },
      {}
    );

    const resourceOptions = {
      static: {
        jsonapiType: resource.type
      },
      attrs: Object.assign(attributes, relationships)
    };

    return Object.assign(allResources, {
      [resource.name]: ApplicationRecord.extend(resourceOptions)
    });
  }, {});

  return (req, res, next) => {
    req.r = resources;

    next();
  };
};
