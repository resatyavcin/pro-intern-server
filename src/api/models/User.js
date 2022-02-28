const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');
const R = require('ramda');

const userSchema = new Schema(
  {
    role: {
      type: String,
      enum: ['Admin', 'Student'],
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    republic_of_turkey_id: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    department_code: {
      type: String,
      optional: true
    },
    grade: {
      type: String,
      optional: true
    },
    right_of_entry: {
      type: Number,
      default: 3
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false
    },
    isBlocked: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  { timestamps: true }
);

// ================= PASSWORD METHODS =================
userSchema.methods.passwordHashed = function () {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);

  this.password = hash;
};

userSchema.methods.passwordCompare = function (password, hashed_password) {
  const is_match = bcrypt.compareSync(password, hashed_password);

  return is_match;
};

userSchema.methods.toJSON = function () {
  return R.omit(['password', '__v', '_id'], this.toObject({ virtuals: true }));
};

module.exports = mongoose.model('User', userSchema);
