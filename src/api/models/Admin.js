const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema(
    {
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
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true
                }
            }
        ]
    },
    { timestamps: true }
);

adminSchema.methods.toJSON = function () {
    const admin = this;

    const adminToObject = admin.toObject();

    delete adminToObject.password;
    delete adminToObject.tokens;

    return adminToObject;
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
