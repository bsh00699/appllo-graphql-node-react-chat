'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'username must not be null'
        },
        notEmpty: {
          msg: 'username must not be empty'
        },
      }
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        // notNull: {
        //   msg: 'email must not be null'
        // },
        // notEmpty: {
        //   msg: 'email must not be empty'
        // },
        isEmail: {
          args: true,
          msg: 'email format err'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'password must not be null'
        },
        notEmpty: {
          msg: 'password must not be empty'
        },
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
    }
  }, {
      sequelize,
      modelName: 'User',
      tableName: 'users'
    });
  return User;
};