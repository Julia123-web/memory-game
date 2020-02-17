const Sequelize = require("sequelize");
const sequelize = require("../db");
const Room = require("../Room/model");

const User = sequelize.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
User.belongsTo(Room);
module.exports = User;
