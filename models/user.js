const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { findUserRejectErrMessage } = require('../helpers/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: (props) => `${props.value} некорректный email!`,
    },
    minlength: 2,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(findUserRejectErrMessage));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(findUserRejectErrMessage));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
