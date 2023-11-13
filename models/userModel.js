const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/mariaDb');

const User = sequelize.define('user', {

  id: { 
    type: DataTypes.STRING(150),
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(150),
    unique: true,
  },
  profile_pic: {
    type: DataTypes.STRING(300),
    allowNull: true,
  },
  first_name: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  cover: {
    type: DataTypes.STRING(300),
    allowNull: true,
  },
  password: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(254),
    allowNull: false,
    unique: true,
  },
  profession: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  phone_number: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  last_location: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  is_google_user: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  is_linkedin_user: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  is_github_user: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  is_redhat_user: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  is_twitter_user: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  is_facebook_user: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE(6),
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE(6),
    allowNull: false,
  }
},{
  tableName: 'user',
  timestamps: true,
});


module.exports = User;
