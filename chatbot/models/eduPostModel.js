const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/mariaDb');

const EducationPost = sequelize.define('EducationPost', {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }, 
  category: {
    type: DataTypes.STRING, // Change the data type as per your schema
    allowNull: false, // or adjust as needed
  },
});

module.exports = EducationPost;
