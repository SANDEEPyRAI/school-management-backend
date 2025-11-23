const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// const jwt = require("jsonwebtoken");
// const User = require("../models/user.model");

// exports.protect = async (req, res, next) => {
//   const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.userId).select("-password");
//     if (!req.user) return res.status(404).json({ message: "User not found" });
//     next();
//   } catch (err) {
//     if (err.name === "TokenExpiredError") {
//       return res.status(401).json({ message: "Token expired" });
//     }
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// exports.authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res
//         .status(403)
//         .json({ message: "Forbidden: insufficient rights" });
//     }
//     next();
//   };
// };
