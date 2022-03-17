const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    role: {
      type: String,
      enum: ['ADMIN', 'STUDENT'],
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
      enum: ['ME', 'EE', 'CE', 'FE']
    },
    grade: {
      type: Number
    },
    right_of_entry: {
      type: Number,
      required: true,
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
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const user = this;

  const userToObject = user.toObject();

  delete userToObject.password;

  return userToObject;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
