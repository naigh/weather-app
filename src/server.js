// require("dotenv").config();
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const path = require("path");
const express = require("express");
const hbs = require("hbs");
const port = parseInt(process.env.PORT) || 3000;
const app = express();

// Paths
const publicPath = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, "../templates/views/");
const partialsPath = path.join(__dirname, "../templates/partials/");
//set hadlebars as view engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// serve static files
app.use(express.static(publicPath));
console.log(publicPath);
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather Application",
    name: "Yann",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Yann",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "Help article not found",
  });
});

// APIS
app.get("/weather", (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({ error: "Please provide an address" });
  }
  geocode(address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(longitude, latitude, (error, response) => {
      if (error) {
        return res.send({ error });
      }
      res.send({ forecast: response, location, address });
    });
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "404 -  Page Not Found!",
  });
});

app.listen(port, () => {
  console.log("server is up on port: " + port);
});
