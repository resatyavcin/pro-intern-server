const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const internSchema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: 'User' },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    status: {
      type: String,
      enum: ['STS-1', 'STS-2', 'STS-3', 'STS-4', 'STS-5', 'STS-6'],
      required: true,
      default: 'STS-1'
    },
    companyInfo: {
      companyName: {
        type: String,
        required: true
      },
      companyAddress: {
        type: String,
        required: true
      },
      companyPhone: {
        type: String,
        required: true
      },
      companyFax: {
        type: String,
        required: true
      },
      companyEmail: {
        type: String,
        required: true
      },
      companyActivity: {
        type: String,
        required: true
      },
      companyTotalEmployee: {
        type: Number,
        required: true
      }
    },
    authorizedPersonName: {
      personFullName: {
        type: String,
        required: true
      },
      personPhone: {
        type: String,
        required: true
      },
      personEmail: {
        type: String,
        required: true
      },
      personJobTitle: {
        type: String,
        required: true
      },
      personTaskArea: {
        type: String,
        required: true
      }
    },
    completed: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  { timestamps: true }
);

const Intern = mongoose.model('Intern', internSchema);

module.exports = Intern;
