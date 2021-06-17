module.exports = () => (req, res, next) => {
  req.hydrate = async dataPromise => {
    const responseCache =
      req.hydrationCache && req.hydrationCache[req.url]
        ? req.hydrationCache[req.url]
        : false;
    const response = responseCache || (await dataPromise).data;
    return response;
  };

  next();
};
