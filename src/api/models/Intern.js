const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const internSchema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: 'User' },
    internshipPeriod: {
      type: String,
      enum: ['Sömestr', 'Yaz'],
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    companyName: {
      type: String,
      required: true
    },
    companyAdress: {
      type: String,
      required: true
    },
    companyActivityArea: {
      type: String,
      required: true
    },
    companyTotalNumberOfEmployees: {
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
    officialNameSurname: {
      type: String,
      required: true
    },
    officialMissionArea: {
      type: String,
      required: true
    },
    officialPhone: {
      type: String,
      required: true
    },
    officialEmail: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['STS-1', 'STS-2', 'STS-3', 'STS-4', 'STS-5', 'STS-6', 'STS-7'],
      required: true,
      default: 'STS-1'
    },
    signature: [
      {
        fileId: {
          type: String
        },
        signatureInfo: [
          {
            signatureBy: {
              type: Schema.Types.ObjectId
            },
            signaturePage: {
              type: [Number]
            }
          }
        ]
      }
    ],
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
