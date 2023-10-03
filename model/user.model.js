const mongoose = require('mongoose');
const validator = require('validator');
const userRoles = require('../Utils/user.Roles')
const Schema = mongoose.Schema;
const userModel = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50, // You can adjust the maximum length as needed
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50, // You can adjust the maximum length as needed
      },
    
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error('Invalid email address');
          }
        },
      },
      password: {
        type: String,
        required: true,
        minlength: 6, // You can adjust the minimum length as needed
      },
      token:{
        type: String
      },
      role:{
        type:String,
        enum:[userRoles.ADMIN,userRoles.MANAGER,userRoles.USER],
        default:userRoles.USER
      }
    });
const User = mongoose.model('user', userModel);
module.exports = User;