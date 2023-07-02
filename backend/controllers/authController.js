const { User } = require("../models/User");
const { Provider } = require("../models/Providers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, password, role } = req.body;
  let foundUser;
  try {
    if (role === "admin") {
      foundUser = await User.findOne({ email: email });
      if (!foundUser)
      return res.status(401).json({ error: "Email is incorrect" }); //Unauthorized
      if (foundUser.role !== "admin")
        return res.status(401).json({ error: "This Email is Unauthorized " }); //Unauthorized
      if (foundUser.active == false)
        return res.status(401).json({ error: "This Email not active " }); //Unauthorized
    }
    if (role === "provider") {
      foundUser = await Provider.findOne({ email: email });
      if (!foundUser)
        return res.status(401).json({ error: "Email is incorrect" }); //Unauthorized
      if (foundUser.active == false)
        return res.status(401).json({ error: "This Email not active " }); //Unauthorized
    }

    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      // create JWTs
      const _id = foundUser._id;
      const email = foundUser.email;
      const role = foundUser.role;
      const token = jwtTokens({ _id, email, role });
      res.status(201).json({
        success: role,
        token: token,
      });
    } else {
      res.status(401).json({ error: "incorrect password" });
    }
  } catch (error) {
    res.status(500).json({ error: `${error.message} in handleLogin` });
  }
};

function jwtTokens({ _id, email, role }) {
  const userToken = { _id, email, role };
  const accessToken = jwt.sign(userToken, process.env.JWT_SECRET);
  return accessToken;
}

const dataUSerLogin = async (req, res) => {
  try {
    if (!req.user)
      return res.status(401).json({ error: "User is UnAuthorized" });
    let userData;
    if (req.user.role === "admin") {
      userData = await User.findById(req.user._id);
    }
    if (req.user.role === "provider") {
      userData = await Provider.findById(req.user._id);
    }

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: `${error.message} in user/getUser` });
  }
};

module.exports = { handleLogin, dataUSerLogin };
