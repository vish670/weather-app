const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoidmlzaGVzaHNpbmdoMSIsImEiOiJja3ppYW0wbnIxam50MnVvYzJ6MGd3YjlpIn0.6gKhugYRR3lncekpywyPVg&limit=1";

  const data = request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("cannot find the given location.Try another search", undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
