require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "60d" });
};

const sending = (email) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "cloudgazer-WeatherApp",
    text: "Merhaba! Cloudgazer Hava durumu tahmini sitesine hoş geldin. İstediğin şehrin hava durumu bilgisi için takipte kal!",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
};
