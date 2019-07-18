const { attr } = require('spraypaint');

const ApplicationRecord = require('./application');

const Product = ApplicationRecord.extend({
  static: {
    jsonapiType: 'products'
  },
  attrs: {
    title: attr(),
    description: attr(),
    image_url: attr()
  }
});

module.exports = Product;
