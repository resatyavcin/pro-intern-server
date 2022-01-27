const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
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
    right_of_entry: {
        type: Number,
        required: true,
        unique: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);