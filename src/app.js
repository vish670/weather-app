console.log("Client side javaScript rendered");
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
console.log(__dirname);
console.log(path.join(__dirname, "../public"));
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPaths = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialPaths);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Vishesh Singh",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Vishesh Singh",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    text: "This is some helpful text",
    name: "Vishesh Singh",
  });
});

app.get("/weather", (req, res) => {
  address = req.query.address;
  if (!address) {
    return res.send({
      error: "Address must be provided",
    });
  }
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      res.send({ error });
    } else {
      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address,
        });
      });
    }
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Please Provide the Search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found",
    name: "Vishesh Singh",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "My 404 page",
    name: "Vishesh Singh",
  });
});

app.listen(3000, () => {
  console.log("server is up at 3000");
});
