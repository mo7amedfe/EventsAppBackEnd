const asyncHandler = require("../utils/asyncHandler");
const registerValidator = require("../utils/registerValidator");

module.exports = asyncHandler((req, res, next) => {

    let valid = registerValidator(req.body);
  
  if (valid) {
    next();
  } else {
    return res.status(403).json({message:"Data not valid", errors: registerValidator.errors });
  }
});
