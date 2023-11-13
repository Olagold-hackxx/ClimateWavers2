const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/mariaDb');

const Post = sequelize.define('post', {
  id: {
    type: DataTypes.STRING(150),
    primaryKey: true,
    allowNull: false,
  },
  date_created: {
    type: DataTypes.DATE(6),
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  content_text: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  content_image: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  comment_count: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
  },
  category: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  user_id: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
},
{
  tableName: 'posts',
  timestamps: false,
});

module.exports = Post;
