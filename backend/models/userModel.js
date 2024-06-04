const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.register = async function (name, lastname, email, password) {
  if (!name || !password || !email || !password) {
    throw Error("Tüm alanlar doldurulmalıdır!");
  }
  if (!validator.isEmail(email)) {
    throw Error("Böyle bir mail adresi bulunamadı!");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Şifre yeterince güçlü değil!");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Bu email zaten kullanılıyor!");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ name, lastname, email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Tüm alanlar doldurulmalıdır!");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Yanlış mail adresi");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Yanlış şifre");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
