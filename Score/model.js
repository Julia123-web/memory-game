const Sequelize = require("sequelize");
const sequelize = require("../db");
const User = require("../User/model");

const Score = sequelize.define("score", {
  level: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  score: {
    type: Sequelize.INTEGER
  }
});

Score.belongsTo(User);

module.exports = Score;
