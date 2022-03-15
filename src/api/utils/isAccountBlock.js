//import Models
const Student = require('../models/Student');
const Admin = require('../models/Admin');

const isAccountBlock = async (role, user) => {

    let fetchedUser;

    if (role === 'admin') {
        fetchedUser = await Admin.findOne({ email: user.email });
    }
    if (role === 'student') {
        fetchedUser = await Student.findOne({ email: user.email });

    }

    const isBlock = fetchedUser.isBlocked;

    return isBlock;
};

module.exports = { isAccountBlock };
