const request = require("postman-request");

const geocode = (address, callback) => {
  const geoToken =
    "pk.eyJ1Ijoib25laW5jaGFzaCIsImEiOiJja3UzZzBjaDAwems0MnZtcG5weWMybWEwIn0.n-hW1GsyHAd0iHywaIFAyw";
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${geoToken}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the geocode Service", undefined);
    } else if (response.body.features.length == 0) {
      callback("Location not found. Try another Location", undefined);
    } else {
      callback(undefined, {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
