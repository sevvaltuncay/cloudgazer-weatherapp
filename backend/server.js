const express = require("express");
const mongoose = require("mongoose");
//const path = require("path");
require("dotenv").config();
const cors = require("cors");
const app = express();
const weatherRoute = require("./routes/weatherRoute");

const userRoutes = require("./routes/user");

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/weather", weatherRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
