const Feedback = require("../models/feedback");
const nodemailer = require("nodemailer");
const postFeedback = async (req, res) => {
  const { name, phoneNumber, email, description } = req.body;

  try {
    const newFeedback = await Feedback.feedback(
      name,
      phoneNumber,
      email,
      description
    );
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Geri Bildiriminiz için teşekkür ederiz!",
      text: `Merhaba! Sitemize geri bildirim verdiğiniz için teşekkürler. Elimizden geldiğince sizlere hizmet vermeye devam edeceğiz ve kendimizi geliştireceğiz. Takipte Kalın! \nAçıklamanız:\n${description}\n\nCloudgazer Weather Forecast Ekibi!`,
    };

    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ message: "Başarıyla oluşturuldu!", feedback: newFeedback });
  } catch (error) {
    res.status(400).json({ message: "Oluşturulamadı!", error: error.message });
  }
};

module.exports = postFeedback;
