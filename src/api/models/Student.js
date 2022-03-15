const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const studentSchema = new Schema(
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
        department_code: {
            type: String,
            enum: ['ME', 'EE', 'CE', 'FE'],
            required: true
        },
        grade: {
            type: Number
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


studentSchema.methods.toJSON = function () {
    const student = this;

    const studentToObject = student.toObject();

    delete studentToObject.password;

    return studentToObject;
};

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
