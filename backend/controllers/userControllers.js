const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "60d" });
};
const createResetToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.RESET_SECRET, { expiresIn: "1h" });
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

const registerUser = async (req, res) => {
  const { name, lastname, email, password } = req.body;

  try {
    const user = await User.register(name, lastname, email, password);

    const token = createToken(user._id);
    res.status(200).json({ token, email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const passUser = async function (req, res) {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Kullanıcı Bulunamadı!" });
    }

    const resetToken = createResetToken(user._id);
    const resetLink = `${process.env.CLIENT_URL}?token=${resetToken}`;

    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        ciphers: "SSLv3",
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Şifre Sıfırlama Talebi",
      text: `Şifrenizi sıfırlamak için lütfen aşağıdaki bağlantıya tıklayın:\n\n${resetLink}\n\nCloudgazer Weather Forecast Ekibi`,
    };

    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ message: "Şifre sıfırlama bağlantısı e-posta ile gönderildi." });
  } catch (error) {
    console.error("E-posta gönderimi sırasında hata:", error); // Hata loglamayı ekleyin
    res.status(500).json({ error: "E-posta gönderilemedi." });
  }
};
const newPassUser = async function (req, res) {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.RESET_SECRET);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await User.findOneAndUpdate(
      { _id: decoded._id },
      { password: hashedPassword },
      { new: true }
    );
    res.status(200).json({ message: "Şifre başarıyla güncellendi" });
    if (!user) {
      res.status(404).json({ error: "Geçersiz Token!" });
    }
  } catch (error) {
    res.status(400).json({ error: "Geçersiz veya süresi dolmuş token" });
  }
};

module.exports = { loginUser, registerUser, newPassUser, passUser };
