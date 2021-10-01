require("dotenv").config();
const request = require("postman-request");
const accessKey = process.env.WS_ACCESS;

const forecast = (longitude, latitude, callback) => {
  const geoLoc = longitude.toString() + "," + latitude.toString();
  const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${geoLoc}`;

  request({ url: url, json: true }, (err, response) => {
    const { current } = response.body;
    if (err) {
      callback("weatherStack service unavailable", undefined);
    } else if (response.body.error) {
      callback("location not found!", undefined);
    } else {
      callback(
        undefined,
        `${current.weather_descriptions[0]}. It is currentyl ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out.`
      );
    }
  });
};
module.exports = forecast;
