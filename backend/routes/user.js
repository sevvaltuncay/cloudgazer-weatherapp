const express = require("express");
const {
  registerUser,
  loginUser,
  newPassUser,
  passUser,
} = require("../controllers/userControllers");
const router = express.Router();

//giris yapma route
router.post("/login", loginUser);

//üyeol
router.post("/register", registerUser);

//şifremi unuttum
router.post("/forget", passUser);

//şifre sıfırlama
router.post("/reset", newPassUser);

module.exports = router;
