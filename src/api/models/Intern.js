const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const internSchema = new Schema({
    isRequest: {
        type: Boolean,
        required: true,
        default: false
    },
    isApproved: {
        type: Boolean,
        required: true,
        default: false
    },
    studentID: {
        type: mongoose.Schema.Type.ObjectID,
        required: true,
        ref: 'User'
    }
}, {timeStamp: true});

module.exports = mongoose.model('Intern', internSchema);