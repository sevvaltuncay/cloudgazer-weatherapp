const Feedback = require("../models/feedback");

const postFeedback = async (req, res) => {
  const { name, phoneNumber, email, description } = req.body;

  try {
    const newFeedback = await Feedback.feedback(
      name,
      phoneNumber,
      email,
      description
    );
    res
      .status(200)
      .json({ message: "Başarıyla oluşturuldu!", feedback: newFeedback });
  } catch (error) {
    res.status(400).json({ message: "Oluşturulamadı!", error: error.message });
  }
};

module.exports = postFeedback;
