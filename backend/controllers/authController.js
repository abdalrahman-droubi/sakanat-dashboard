const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await User.findOne({ email: email });
    if (foundUser.active == false)
      return res.status(401).json({ error: "This Email not active " }); //Unauthorized
    if (!foundUser)
      return res.status(401).json({ error: "Email is incorrect" }); //Unauthorized

    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      // create JWTs
      const fullName = foundUser.fullName
      const email = foundUser.email
      const role = foundUser.role
      const token = jwtTokens({ fullName, email, role });
      res
        .status(201)
        .json({ success: ` user ${foundUser.fullName} are authorized`, token: token });
    } else {
      res.status(401).json({ error: "incorrect password" });
    }
  } catch (error) {
    res.status(500).json({ error: `${error.message} in handleLogin` });
  }
};

function jwtTokens({ fullName, email, role }) {
  const userToken = { fullName, email, role };
  const accessToken = jwt.sign(userToken, process.env.JWT_SECRET);
  return accessToken;
}
module.exports = { handleLogin };
