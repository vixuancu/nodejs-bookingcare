import express from "express";
//set up view engine
//set up static files
let configViewEngine = (app) => {
  app.use(express.static("./src/public"));
  app.set("view engine", "ejs");
  app.set("views", "./src/views");
};
module.exports = configViewEngine;
