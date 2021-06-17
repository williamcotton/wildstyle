module.exports = () => (req, res, next) => {
  res.expressLink.hydrationCache = {};

  req.hydrate = async dataPromise => {
    const response = (await dataPromise).data;
    res.expressLink.hydrationCache[req.url] = response;
    return response;
  };

  next();
};
