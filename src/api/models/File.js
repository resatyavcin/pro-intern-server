const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema(
  {
    filePath: {
      type: String,
      required: true
    },
    approve: {
      type: Boolean,
      default: false
    },
    companySignature: {
      type: Boolean,
      default: false
    },
    approver: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    isTrash: {
      type: Boolean,
      default: false
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
