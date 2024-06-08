const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const feedbackSchema = new Schema({
  name: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});

feedbackSchema.statics.feedback = async function (
  name,
  phoneNumber,
  email,
  description
) {
  if (!name || !phoneNumber || !email || !description) {
    throw Error("Tüm alanlar doldurulmalıdır!");
  }
  if (!validator.isEmail(email)) {
    throw Error("Böyle bir mail adresi bulunamadı!");
  }
  if (!validator.isMobilePhone(phoneNumber, "any", { strictMode: true })) {
    throw Error("Geçerli bir telefon numarası giriniz!");
  }

  const feedback = await this.create({ name, phoneNumber, email, description });

  return feedback;
};

module.exports = mongoose.model("Feedback", feedbackSchema);
