const express = require("express");
const mongoose = require("mongoose");
//const path = require("path");
require("dotenv").config();
const cors = require("cors");
const app = express();
const weatherRoute = require("./routes/weatherRoute");

const userRoutes = require("./routes/user");

app.use(
  cors({
    origin: ["https://cloudgazer-weatherapp.vercel.app"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
app.use("/api/user", userRoutes);
app.use("/api/weather", weatherRoute);
