const analyticsRouter = require('router')();

analyticsRouter.get('/', (req, res) => {
  res.pageview({ title: 'Front Page' });
});

module.exports = {
  analyticsRouter
};
