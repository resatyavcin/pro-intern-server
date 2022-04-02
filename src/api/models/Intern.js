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
      name: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      },
      fax: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      activity: {
        type: String,
        required: true
      },
      totalEmployee: {
        type: Number,
        required: true
      }
    },
    authorizedPersonName: {
      fullName: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      jobTitle: {
        type: String,
        required: true
      },
      taskArea: {
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
