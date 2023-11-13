const { DataTypes } = require("sequelize");
const sequelize = require("../utils/dbconnect");


const User = sequelize.define(
  "User",
  {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
	  },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
    lastName: {
      type: DataTypes.STRING,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
	  defaultValue: false
    },
    username: {
      type: DataTypes.STRING,
	  allowNull: false,
	  unique: true
    },
    isRedhatUser: {
      type: DataTypes.BOOLEAN,
	  defaultValue: false
    },
	isFacebookUser: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
	isLinkedinUser: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
	isGoogleUser: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
	isTwitterUser: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
	isGithubUser: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
    password: {
      type: DataTypes.STRING,
    },

	isActive: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
	profilePic: {
		type: DataTypes.STRING
	},
	bio: {
		type: DataTypes.STRING
	},
	cover: {
		type: DataTypes.STRING
	},
	phoneNumber: {
		type: DataTypes.STRING
	},
	lastLocation: {
		type: DataTypes.STRING
	}
  },
  { tableName: 'user', timestamps: true, underscored: true }
);


module.exports = User;
