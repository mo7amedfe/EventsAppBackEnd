const asyncHandler = require("../utils/asyncHandler");
const loginValidator = require("../utils/loginValidator");


module.exports =asyncHandler((req, res, next) => {
  let valid = loginValidator(req.body);
  if (valid) {
    next();
  } else {
    return res.status(403).json({ errors: loginValidator.errors });
  }
});
