const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyUser = require("../middleware/verifyUser");

router.post("/auth", authController.handleLogin);
router.get("/auth/getUser", verifyUser, authController.dataUSerLogin);

module.exports = router;
