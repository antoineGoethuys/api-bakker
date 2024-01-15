//import
const bcrypt = require("bcrypt");
const models = require("../models");
const jwt = require("jsonwebtoken");
const asyncLib = require("async");

// routes
module.exports = {
  register: (req, res) => {
    // params
    const name = req.body.name;
    const address = req.body.address;
    const email = req.body.email;
    const password = req.body.password;

    // verification
    if (name == null || address == null || email == null || password == null) {
      return res.status(400).json({ error: "missing parameters" });
    }
    if (name.length >= 13 || name.length <= 4) {
      return res
        .status(400)
        .json({ error: "wrong username (must be length 5 - 12)" });
    }
    if (address.length >= 13 || address.length <= 4) {
      return res
        .status(400)
        .json({ error: "wrong address (must be length 5 - 12)" });
    }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/.test(email)) {
      return res.status(400).json({ error: "email is not valid" });
    }
    if (password.length >= 13 || password.length <= 4) {
      return res
        .status(400)
        .json({ error: "wrong password (must be length 5 - 12)" });
    }

    models.Client.findOne({
      attributes: ["email"],
      where: { email: email },
    })
      .then((userFound) => {
        if (!userFound) {
          bcrypt.hash(password, 5, (err, bcryptedPassword) => {
            const newUser = models.Client.create({
              name: name,
              address: address,
              email: email,
              password: bcryptedPassword,
            })
              .then((newUser) => {
                return res.status(201).json({
                  userId: newUser.id,
                });
              })
              .catch((err) => {
                return res.status(500).json({ error: "cannot add user" });
              });
          });
        } else {
          return res.status(409).json({ error: "user already exist" });
        }
      })
      .catch((err) => {
        return res.status(500).json({ error: "unable to verify user" });
      });
  },
  login: (req, res) => {
    // params
    const email = req.body.email;
    const password = req.body.password;

    // verification
    if (email == null || password == null) {
      return res.status(400).json({ error: "missing parameters" });
    }

    models.Client.findOne({
      where: { email: email },
    })
      .then((userFound) => {
        if (userFound) {
          bcrypt.compare(
            password,
            userFound.password,
            (errBycrypt, resBycrypt) => {
              if (resBycrypt) {
                return res.status(200).json({
                  userId: userFound.id,
                  token: jwt.sign(
                    { userId: userFound.id },
                    "RANDOM_TOKEN_SECRET",
                    { expiresIn: "24h" }
                  ),
                });
              } else {
                return res.status(403).json({ error: "invalid password" });
              }
            }
          );
        } else {
          return res.status(404).json({ error: "user not exist in DB" });
        }
      })
      .catch((err) => {
        return res.status(500).json({ error: "unable to verify user" });
      });
  },
  getUserOrder: (req, res) => {
    // Récupérer l'ID du client à partir de l'URL
    const clientId = req.params.id;

    // Rechercher toutes les commandes correspondantes
    models.Order.findAll({ where: { clientId: clientId } })
      .then((orders) => {
        if (orders && orders.length > 0) {
          // Si des commandes ont été trouvées, renvoyer les détails des commandes
          res.status(200).json(orders);
        } else {
          // Si aucune commande n'a été trouvée, renvoyer une erreur
          res.status(404).json({ error: "No orders found for this client" });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },
  // Update user information
  updateUser: (req, res) => {
    // params
    const userId = req.params.id;
    const name = req.body.name;
    const address = req.body.address;
    const email = req.body.email;
    const password = req.body.password;

    models.Client.findOne({
      where: { id: userId },
    })
      .then((userFound) => {
        if (userFound) {
          userFound
            .update({
              name: name ? name : userFound.name,
              address: address ? address : userFound.address,
              email: email ? email : userFound.email,
              password: password
                ? bcrypt.hashSync(password, 5)
                : userFound.password,
            })
            .then(() => {
              res.status(200).json(userFound);
            })
            .catch((err) => {
              res.status(500).json({ error: "cannot update user" });
            });
        } else {
          res.status(404).json({ error: "user not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "unable to verify user" });
      });
  },
};
