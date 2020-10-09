var express = require("express");
var router = express.Router();
const weatherController = require("../controller/weatherController");

/* GET home page. */
router.get("/city", weatherController.getWeatherDataByCity);
router.get("/coord", weatherController.getWeatherByCurrentLocation);

module.exports = router;
