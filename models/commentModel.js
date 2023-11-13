const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/mariaDb');


const Comment = sequelize.define('comment', {
    id: {
      type: DataTypes.STRING(150),
      primaryKey: true,
      allowNull: false,
    },
    content_image: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    comment_content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    comment_time: {
      type: DataTypes.DATE(6),
      allowNull: false,
    },
    commenter_id: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    parent_comment_id: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    post_id: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
  }, {
        tableName: 'comment',
        timestamps: false,
  }); 
  
  sequelize.sync();
  
  // Export the Comment model
  module.exports = Comment;
  