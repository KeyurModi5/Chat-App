const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (id) => {
  return jwt.sign({ id }, "", { expiresIn: "30d" });
};

module.exports = generateToken;
