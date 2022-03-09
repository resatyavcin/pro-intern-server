const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        role: {
            type: String,
            enum: ['admin', 'student'],
            required: true
        },
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
            enum: ['ME', 'EE', 'CE', 'FE'],
            optional: true
        },
        grade: {
            type: Number,
            optional: true
        },
        right_of_entry: {
            type: Number,
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
        }
    },
    { timestamps: true }
);


userSchema.methods.publicUserInfo = function () {
    const user = this;

    const userToObject = user.toObject();

    delete userToObject.password;

    return userToObject;
}


const User = mongoose.model('User', userSchema);

module.exports = User;