const express = require("express");
const app = express.Router();
const path = require("path");
//Routing list
app.get("/", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../views", "home.html"))
);
app.get("/login", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../views", "login.html"))
);
app.get("/register", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../views", "register.html"))
);
app.get("/market", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../views", "market.html"))
);
app.get("/likes", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../views", "likes.html"))
);
app.get("/productDetail", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../views", "productDetail.html"))
);
app.get("/resetPass", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../views", "resetPassword.html"))
);

module.exports = app;
