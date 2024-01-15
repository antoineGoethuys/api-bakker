// import
const express = require("express");
const bodyParser = require("body-parser");
const apiRouter = require("./apiRouter").router;

//initialize
const server = express();

//config parser
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
//config middlewares

server.use("/api/", apiRouter);

//launch server
server.listen(8080, () => {
  console.log("Server is running...");
});
