const asyncHandler = require("./../utils/asyncHandler");
const userModel = require("./../models/user.model");
const bcrypt = require("bcrypt");


exports.register = asyncHandler(async (req, res) => {
  const { name, email, password ,role} = req.body;

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json("This email has been registered before");
  }

  newUser = await userModel.create({ name, email, password,role });
  return res.status(200).json({
    message: "register success",
  });
});

exports.login = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  let credential = await userModel.findOne({ email }).select(+password);

  let isPasswordMatch = await bcrypt.compare(password, credential.password);

  if (!isPasswordMatch || !credential) {

    return res.status(400).send("credintial not found");

  }

   res.header("x-auth-token", credential.getAuthToken());

  return res.status(200).json({
    message: "login success",
    token: credential.getAuthToken(),
  });
});
