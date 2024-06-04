const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema(
  {
    city: { type: String, required: true },
    temp: { type: Number, required: true },
    humidity: { type: Number, required: true },
    feels_like: { type: Number, required: true },
    pressure: { type: Number, required: true },
    icon: { type: String },
    description: { type: String, required: true },
    likes: { type: Number, default: 0 },
    user_id: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Weathers", weatherSchema);
