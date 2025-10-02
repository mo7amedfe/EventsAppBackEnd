const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");


const authorize = (...allowedRoles) => asyncHandler(async (req, res, next) => {

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {

    return res.status(401).json({ message: "Authorization Error" });
  }

    console.log(authHeader);
    
  const token = authHeader.split(" ")[1];


  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded?.id) {
    return res.status(401).json({ message: "Invalid Token" });
  }


  const user = await userModel.findById(decoded.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!allowedRoles.includes(user.role)) {
    return res.status(403).json({ message: "Access Denied" });
  }
  req.user = user;

  next();
});

module.exports = authorize;
