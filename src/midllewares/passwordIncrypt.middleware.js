const bcrypt = require("bcrypt");
const asyncHandler = require("../utils/asyncHandler");

module.exports = asyncHandler(async (req, res, next) => {
  const { password, rePassword } = req.body;

  if (password !== rePassword) {
    res.status(400).send("passwords don't match")
  }

  let salt =await bcrypt.genSalt(10)
  let incryptedPassword = await bcrypt.hash(password,salt)

  req.body.password=incryptedPassword;
  req.body.rePassword = null;

  next()
});
