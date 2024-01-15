//import
const bcrypt = require("bcrypt");
const models = require("../models");
const jwt = require("jsonwebtoken");
const asyncLib = require("async");

// routes
module.exports = {
  // Create a product
  createProduct: (req, res) => {
    // params
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const image = req.body.image;

    models.Product.create({
      name: name,
      description: description,
      price: price,
      image: image,
    })
      .then((newProduct) => {
        res.status(201).json(newProduct);
      })
      .catch((err) => {
        res.status(500).json({ error: "cannot add product" });
      });
  },
  // Update a product
  updateProduct: (req, res) => {
    // params
    const productId = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;

    models.Product.findOne({
      where: { id: productId },
    })
      .then((productFound) => {
        if (productFound) {
          productFound
            .update({
              name: name ? name : productFound.name,
              description: description ? description : productFound.description,
              price: price ? price : productFound.price,
              imageUrl: imageUrl ? imageUrl : productFound.imageUrl,
            })
            .then(() => {
              res.status(200).json(productFound);
            })
            .catch((err) => {
              res.status(500).json({ error: "cannot update product" });
            });
        } else {
          res.status(404).json({ error: "product not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "unable to verify product" });
      });
  },
  getPoduct: (req, res) => {
    // params
    const productId = req.params.id;

    models.Product.findOne({
      where: { id: productId },
    })
      .then((productFound) => {
        if (productFound) {
          res.status(200).json(productFound);
        } else {
          res.status(404).json({ error: "product not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "unable to verify product" });
      });
  },
  getAllProducts: (req, res) => {
    models.Product.findAll({
      order: [["id", "DESC"]],
    })
      .then((products) => {
        if (products) {
          res.status(200).json(products);
        } else {
          res.status(404).json({ error: "no products found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "invalid fields" });
      });
  },
};
