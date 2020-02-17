const Sequelize = require("sequelize");
const sequelize = require("../db");

const Room = sequelize.define("room", {
  roomName: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Room;
