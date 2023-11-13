const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/dbconnect");
const User = require("./User");

const Token = sequelize.define(
  "Token",
  {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
	  },
    refreshToken: { type: DataTypes.STRING, required: true },
    isValid: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { tableName: "token", timestamps: true, underscored: true}
);

Token.belongsTo(User);
User.hasOne(Token);

module.exports = Token;
