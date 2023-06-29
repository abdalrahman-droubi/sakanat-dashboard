const bcrypt = require("bcrypt");
const { User } = require("../models/User");
const jwt = require('jsonwebtoken')

const handleNewUser = async (req, res) => {
  const { fullName, email, role, password} = req.body;
  try {
    // email check
    const user = await User.findOne({ email: email });
    if (user !== null) {
      return res.status(409).json({ error: "email already exists try another one" });
    }
    // password hash
    const hashedPwd = await bcrypt.hash(password, 10);
    const Newuser = await User.create({
      fullName,
      email,
      role,
      password:hashedPwd,
    });
    res
      .status(201)
      .json({ success: `New user ${email} created successfully!` });
  } catch (error) {
    res.status(500).json({ error: `${error.message} in handleNewUser` });
  }
};


module.exports = { handleNewUser };
