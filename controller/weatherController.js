const { get } = require("../routes");
require("dotenv").config();

const weatherController = {};
const apikey = process.env.OPEN_WEATHER_KEY;
const axios = require("axios");

weatherController.getWeatherDataByCity = async (req, res, next) => {
  try {
    console.log("what is req", req.query.q);
    const city = req.query.q;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    let response = await axios.get(url);
    // console.log("response??", response);
    const longitudeByCity = response.data.coord.lon
    const latitudeByCity = response.data.coord.lat
    console.log("by city long is",longitudeByCity)
    let urlForecast =`https://api.openweathermap.org/data/2.5/onecall?lat=${latitudeByCity}&lon=${longitudeByCity}&appid=${apikey}&units=metric`
    let responseForecast = await axios.get(urlForecast)
    res.send({ status: "success", data: responseForecast.data });
   
  } catch (error) {
    res.status(400).send({ status: "fail roi do ngu", data: error.message });
  }
  //   res.send({ status: data });
};
weatherController.getWeatherByCurrentLocation = async (req, res, next) => {
  try {
    const currentCityLong = req.query.long;
    const currentCityLat = req.query.lat;
    let url = `http://api.openweathermap.org/data/2.5/weather?lon=${currentCityLong}&lat=${currentCityLat}&appid=${apikey}&units=metric`;
    let response = await axios.get(url);
    res.send({ status: "success", data: response.data });
  } catch (error) {
    res.status(400).send({ status: "fail roi current", data: error.message });
  }

  //   res.send({ status: data });
};
module.exports = weatherController;
