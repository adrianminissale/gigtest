const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const Currency = sequelize.define(
  "currency",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
        type: DataTypes.INTEGER
    }
  },
  { timestamps: false }
);

module.exports = Currency;