const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validator = require('validator');

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
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('VALIDATION.EMAIL_ERROR');
        }
      }
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
    rightOfEntry: {
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
    isTrash: {
      type: Boolean,
      required: true,
      default: false
    },
    interns: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Intern'
      }
    ],
    remainingIntern: {
      type: Number,
      optional: true,
      default(value) {
        if (this.role === 'STUDENT') {
          value = 2;
        }
      }
    },
    internFileContentFields: {
      address: {
        type: String,
        optional: true
      },
      homePhone: {
        type: String,
        optional: true
      },
      dadFullName: {
        type: String,
        optional: true
      },
      momFullName: {
        type: String,
        optional: true
      },
      placeOfBird: {
        type: String,
        optional: true
      },
      placeOfDate: {
        type: String,
        optional: true
      }
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
