const fetch = require("node-fetch");
const mongoose = require("mongoose");
require("dotenv").config();
const Weathers = require("../models/Weathers");
const API_KEY = process.env.OPENWEATHER_API_KEY;

exports.getWeather = async (req, res) => {
  try {
    const user_id = req.user._id;
    const weathers = await Weathers.find({ user_id });
    res.status(200).json(weathers);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch weather data" });
  }
};

exports.deleteWeather = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such weather" });
  }

  const weather = await Weathers.findOneAndDelete({ _id: id });
  if (!weather) {
    return res.status(400).json({ error: "No such weather" });
  }

  res.status(200).json(weather);
};

exports.likeWeather = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such weather" });
  }

  try {
    const weather = await Weathers.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!weather) {
      return res.status(400).json({ error: "No such weather" });
    }

    res.status(200).json(weather);
  } catch (error) {
    res.status(500).json({ error: "Failed to like weather" });
  }
};

exports.createWeather = async (req, res) => {
  const { city } = req.body;

  try {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        API_KEY +
        "&units=metric" +
        "&lang=tr"
    );
    const data = await response.json();

    const iconCode = data.weather[0].icon; // Hava durumu ikon kodu
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    if (response.ok) {
      const user_id = req.user._id;
      const weatherData = new Weathers({
        city: data.name,
        temp: data.main.temp,
        humidity: data.main.humidity,
        feels_like: data.main.feels_like,
        pressure: data.main.pressure,
        description: data.weather[0].description,
        icon: iconUrl,
        likes: 0,
        user_id: user_id,
      });

      const savedWeather = await weatherData.save();
      res.status(201).json(savedWeather);
    } else {
      res.status(400).json({ message: data.message });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateWeather = async (req, res) => {
  const { id } = req.params;

  try {
    const weather = await Weathers.findById(id);

    if (!weather) {
      return res.status(404).json({ error: "No such weather" });
    }

    const city = weather.city;

    const updateResponse = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        API_KEY +
        "&units=metric" +
        "&lang=tr"
    );
    const updateData = await updateResponse.json();

    if (updateResponse.ok) {
      const updatedWeather = {
        city: updateData.name,
        temp: updateData.main.temp,
        humidity: updateData.main.humidity,
        feels_like: updateData.main.feels_like,
        pressure: updateData.main.pressure,
        description: updateData.weather[0].description,
      };

      const updatedWeatherData = await Weathers.findByIdAndUpdate(
        id,
        updatedWeather,
        { new: true }
      );

      if (!updatedWeatherData) {
        return res.status(400).json({ error: "No such weather" });
      }

      console.log(`Weather data for ${city} updated successfully.`);

      res.status(200).json(updatedWeatherData);
    } else {
      res.status(400).json({ message: updateData.message });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
