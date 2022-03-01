const request = require("postman-request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=baed2dd0309908092838d1099b37c03f&query=" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("weather services is not available", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const currentData = body.current;
      callback(
        undefined,
        currentData.weather_descriptions[0] +
          ". It is currently " +
          currentData.temperature +
          " degrees out. It feels like " +
          currentData.feelslike +
          " degrees out."
      );
    }
  });
};

module.exports = forecast;
