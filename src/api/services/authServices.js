//import Models
const Student = require('../models/Student');
const Admin = require('../models/Admin');

//import Utils
const { isAccountBlock } = require('../utils/isAccountBlock');

//import Packages
const jwt = require('jsonwebtoken');


//It is a function for attracting users.
const fetchUser = async (role, email) => {

    let user;

    if (role === 'admin') {
        user = await Admin.findOne({ email });
    }
    if (role === 'student') {
        user = await Student.findOne({ email });
    }

    if (!user) {
        throw 'There is no such user';
    }

    return user;
};

const generateLoginToken = async (role, user) => {
    const token = await jwt.sign({ _id: user._id.toString(), role }, process.env.SECRET_KEY);

    user.tokens = user.tokens.concat({ token });

    await user.save();

    return token;
};

const generateVerifyToken = async (body) => {
    const token = await jwt.sign({ user: body }, process.env.VERIFY_ACCOUNT_KEY);

    return token;
}


//It is a function that reduces the account entry right by one.
const reduceTheRightOfEntry = async (role, user) => {
    if (await isAccountBlock(role, user)) {
        throw 'Your account is locked';
    }

    if (user.right_of_entry !== 0) {
        const decreased = await user.right_of_entry - 1;


        if (role === 'admin') {
            await Admin.findOneAndUpdate({ id: user.id }, { right_of_entry: decreased });

        }
        if (role === 'student') {
            await Student.findOneAndUpdate({ id: user.id }, { right_of_entry: decreased });
        }

    } else if (user.right_of_entry === 0) {
        accountBlock(role, user);
    }
};

//It is a function that blocks the account.
const accountBlock = async (role, user) => {
    if (role === 'admin') {
        await Admin.findOneAndUpdate({ email: user.email }, { isBlocked: true });
    }
    if (role === 'student') {
        await Student.findOneAndUpdate({ email: user.email }, { isBlocked: true });
    }
};

const verifiyAccount = async (user) => {

    if (user.role === 'admin') {
        await Admin.findOneAndUpdate({ email: user.email }, { isVerified: true });
    }
    if (user.role === 'student') {
        await Student.findOneAndUpdate({ email: user.email }, { isVerified: true });
    }

}


module.exports = {
    fetchUser,
    generateLoginToken,
    generateVerifyToken,
    accountBlock,
    verifiyAccount,
    reduceTheRightOfEntry
};
