module.exports = (asyncFunction) => {
  return async function (req, res, next) {
    try {
      await asyncFunction(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
