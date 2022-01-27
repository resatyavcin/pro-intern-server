const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
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
        required: true,
    },
    grade:{
        type: String,
        required: true, 
    },
    right_of_entry: {
        type: Number,
        required: true,
        unique: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);