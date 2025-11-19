// const jwt = require("jsonwebtoken");

// const generateToken = (userId, role) => {
//   return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
// };

// module.exports = generateToken;

const jwt = require("jsonwebtoken");

const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role }, // payload (data inside token)
    process.env.JWT_SECRET, // secret key (must be set in .env)
    { expiresIn: "7d" } // options (token expiry)
  );
};

module.exports = generateToken;
