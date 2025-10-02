const asyncHandler = require("./../utils/asyncHandler");
const userModel = require("./../models/user.model");
const bcrypt = require("bcrypt");

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      message: "This email has been registered before",
    });
  }

  newUser = await userModel.create({ name, email, password, role });
  return res.status(200).json({
    message: "register success",
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  let credential = await userModel.findOne({ email }).select(+password);

  if (!credential) {
    return res.status(400).json({
      message: "You are not registered before,please register first",
    });
  }

  let isPasswordMatch = await bcrypt.compare(password, credential.password);

  if (!isPasswordMatch) {
    return res.status(400).send("credintial not found");
  }

  res.header("x-auth-token", credential.getAuthToken());

  return res.status(200).json({
    message: "login success",
    token: credential.getAuthToken(),
  });
});
exports.editProfile = asyncHandler(async (req, res) => {
  const { name, bio } = req.body;
  let credential = await userModel.findById(req.user._id);

  if (!credential) {
    return res.status(400).json({
      message: "credntial not found",
    });
  }

  if (name) {
    credential.name = name;
  }
  if (bio) {
    credential.bio = bio;
  }
  if (req.file) {
    credential.profilePic = req.file.path; // Cloudinary URL
  }
  const updatedUser = await credential.save();

  token = await credential.getAuthToken();

  res.status(200).json({
    updatedUser,
    token,
    message: "done",
  });
});

exports.getProfile = asyncHandler(async (req, res) => {
  credentialId = req.user._id;
  credential = await userModel.findById(credentialId);
  if (!credential)
    return res.status(404).json({ message: "not found credential" });

  res.status(200).json({
    credential
  })
});
