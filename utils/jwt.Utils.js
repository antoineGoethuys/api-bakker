const jwt = require("jsonwebtoken");

module.exports = {
  generateTokenForUser: function (userData) {
    return jwt.sign(
      {
        userId: userData.id,
        isAdmin: userData.isAdmin,
      },
      JWT_SIGN_SECRET,
      {
        expiresIn: "1h",
      }
    );
  },
  parseAuthorization: function (authorization) {
    return authorization != null ? authorization.replace("Bearer ", "") : null;
  },
  getUserId: function (authorization) {
    let userId = -1;
    const token = module.exports.parseAuthorization(authorization);
    if (token != null) {
      try {
        const jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        if (jwtToken != null) userId = jwtToken.userId;
      } catch (err) {
        // TODO: Handle error
      }
    }
    return userId;
  },
  updateUserOrder: (req, res) => {
    // Getting auth header
    const headerAuth = req.headers["authorization"];
    const userId = jwtUtils.getUserId(headerAuth);

    // Params
    const orderId = req.params.orderId;
    const status = req.body.status;

    if (userId < 0) return res.status(400).json({ error: "wrong token" });

    models.Order.findOne({
      where: { id: orderId },
    })
      .then((orderFound) => {
        if (orderFound) {
          orderFound
            .update({
              status: status,
            })
            .then((orderFound) => {
              if (orderFound) {
                return res.status(201).json(orderFound);
              } else {
                return res.status(500).json({ error: "cannot update order" });
              }
            })
            .catch((_) => {
              return res.status(500).json({ error: "cannot update order" });
            });
        } else {
          return res.status(404).json({ error: "order not found" });
        }
      })
      .catch((_) => {
        return res.status(500).json({ error: "unable to verify order" });
      });
  },
};
