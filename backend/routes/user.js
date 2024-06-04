const express = require("express");
const { registerUser, loginUser } = require("../controllers/userControllers");
const router = express.Router();

//giris yapma route
router.post("/login", loginUser);

//üyeol
router.post("/register", registerUser);

module.exports = router;
