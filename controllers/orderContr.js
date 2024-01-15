// imports
const bcrypt = require("bcrypt");
const models = require("../models");

// routes
module.exports = {
  // Create an order
  createOrder: (req, res) => {
    // params
    const userId = req.body.userId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;

    models.Order.create({
      UserId: userId,
      ProductId: productId,
      quantity: quantity,
    })
      .then((newOrder) => {
        res.status(201).json(newOrder);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "cannot add order", details: err });
      });
  },

  // Get a specific order
  getOrder: (req, res) => {
    // params
    const orderId = req.params.id;

    models.Order.findOne({
      where: { id: orderId },
    })
      .then((orderFound) => {
        if (orderFound) {
          res.status(200).json(orderFound);
        } else {
          res.status(404).json({ error: "order not found" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "unable to verify order", details: err });
      });
  },
};
