// imports
const express = require("express");
const usersContr = require("./controllers/usersContr");
const productsContr = require("./controllers/productContr");
const ordersContr = require("./controllers/orderContr");

exports.router = (() => {
  const apiRouter = express.Router();

  // User routes
  apiRouter.route("/users/register/").post(usersContr.register);
  apiRouter.route("/users/login/").post(usersContr.login);
  apiRouter.route("/users/:id").put(usersContr.updateUser);
  apiRouter.route("/users/:id/orders").get(usersContr.getUserOrder);

  // Product routes
  apiRouter.route("/products/").get(productsContr.getAllProducts);
  apiRouter.route("/products/add").post(productsContr.createProduct);
  apiRouter.route("/products/:id").put(productsContr.updateProduct);

  // Order routes
  apiRouter.route("/orders/").post(ordersContr.createOrder);
  apiRouter.route("/orders/:id").get(ordersContr.getOrder);

  return apiRouter;
})();
