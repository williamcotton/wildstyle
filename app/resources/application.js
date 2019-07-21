require('isomorphic-fetch');
const { SpraypaintBase } = require('spraypaint');

const ApplicationRecord = SpraypaintBase.extend({
  static: {
    baseUrl: 'http://localhost:2000',
    apiNamespace: '/api/v1'
  }
});

module.exports = ApplicationRecord;
