const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema(
  {
    companySignaturePath: {
      type: String
    },
    adminSignaturePath: {
      type: String
    },
    studentSignaturePath: {
      type: String
    },
    approver: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    intern: {
      type: Schema.Types.ObjectId,
      ref: 'Intern'
    }
  },
  { timestamps: true }
);

const File = mongoose.model('File', fileSchema);

module.exports = File;
