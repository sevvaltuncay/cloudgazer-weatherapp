const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "60d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);
    res.status(200).json({ token, email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerUser = async function (req, res) {
  const { name, lastname, email, password } = req.body;

  try {
    const user = await User.register(name, lastname, email, password);

    //token
    const token = createToken(user._id);
    res.status(200).json({ token, email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, registerUser };
