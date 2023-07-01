// require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403); //UnAuthorized Error
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log({ error: `${error.message} in middleware/verifyUser` });
  }
};

module.exports = verifyUser;
