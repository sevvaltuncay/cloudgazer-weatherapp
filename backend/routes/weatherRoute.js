const express = require("express");
const router = express.Router();
const {
  createWeather,
  deleteWeather,
  likeWeather,
  getWeather,
  updateWeather,
} = require("../controllers/weatherController");
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);
// Üye olmadan eklenmesin diye

router.post("/", createWeather);
router.put("/:id", updateWeather);
router.get("/", getWeather);
router.delete("/:id", deleteWeather);
router.put("/:id/like", likeWeather);

module.exports = router;
