const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const session = require("express-session");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Express Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mySecret", // Secret key buraya eklenmeli
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // production'da secure: true ve https kullanmanız gerekir
  })
);

// MongoDB bağlantısı
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Root route
app.get("/", (req, res) => {
  res.send("Sunucu çalışıyor");
});

// User model
const User = require("./Models/user");

// Üye olma endpoint'i
app.post("/register", async (req, res) => {
  const { name, lastname, email, password } = req.body;

  try {
    // Kullanıcı olup olmadığını kontrol et
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Bu email zaten kullanılıyor." });
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcı oluştur
    const newUser = new User({
      name,
      lastname,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu." });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Kullanıcı oluşturulamadı." });
  }
});

// Giriş yapma endpoint'i
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kullanıcıyı bul
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Geçersiz email veya şifre." });
    }

    // Şifreyi karşılaştır (hashleme)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Geçersiz email veya şifre." });
    }

    // Kullanıcıyı oturumda sakla
    req.session.userId = user._id;

    res.status(200).json({ message: "Giriş başarılı" });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ message: "Giriş yapılamadı." });
  }
});

// Oturum kapatma endpoint'i
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Çıkış yapılamadı." });
    }
    res.clearCookie("connect.sid"); // Session ID cookie'sini temizle
    res.status(200).json({ message: "Çıkış başarılı" });
  });
});

// Auth middleware
const auth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Erişim reddedildi." });
  }
  next();
};

// Korunmuş route örneği
app.get("/protected", auth, (req, res) => {
  res
    .status(200)
    .json({ message: "Bu korumalı bir rotadır.", userId: req.session.userId });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//MONGO_URI=mongodb+srv://sevval:sevval1234@cluster0.o8wqnb8.mongodb.net/
