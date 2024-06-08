const express = require("express");
const router = express.Router();
const postFeedback = require("../controllers/feedbackController");

router.post("/feedback", postFeedback);

module.exports = router;
