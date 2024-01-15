"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      try {
        Order.belongsTo(models.Client, { foreignKey: "clientId" });
        Order.belongsToMany(models.Product, {
          through: "OrderProduct",
          foreignKey: "orderId",
        });
      } catch (error) {
        console.error(
          `Error in associating models for Order: ${error.message}`
        );
      }
    }
  }
  Order.init(
    {
      clientId: DataTypes.INTEGER,
      total: DataTypes.FLOAT,
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
