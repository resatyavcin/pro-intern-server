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
    republicOfTurkeyId: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    departmentCode: {
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
      type: Number
    },
    internFileContentFields: {
      address: {
        type: String
      },
      homePhone: {
        type: String
      },
      dadFullName: {
        type: String
      },
      momFullName: {
        type: String
      },
      placeOfBird: {
        type: String
      },
      placeOfDate: {
        type: String
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

userSchema.pre('save', function (next) {
  if (this.role === 'STUDENT') {
    this.remainingIntern = 2;
  }
  next();
});

userSchema.methods.toJSON = function () {
  const user = this;

  const userToObject = user.toObject();

  delete userToObject.password;

  return userToObject;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
