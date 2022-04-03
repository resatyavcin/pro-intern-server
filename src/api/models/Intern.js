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
      enum: ['STS-1', 'STS-2', 'STS-3', 'STS-4', 'STS-5', 'STS-6', 'STS-7'],
      required: true,
      default: 'STS-1'
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
