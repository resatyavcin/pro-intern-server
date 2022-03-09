//import Models
const User = require('../models/User');

//import Utils
const { isAccountBlock } = require('../utils/isAccountBlock')

//import Packages
const jwt = require('jsonwebtoken');


//It is a function for attracting users.
const fetchUser = (email) => {
    const user = User.findOne({ email });

    if (!user) {
        throw 'There is no such user';
    }

    return user;
};


const generateToken = async (user) => {

    const token = await jwt.sign({ _id: user._id.toString() }, process.env.SECRET_KEY);

    user.tokens = user.tokens.concat({ token });

    await user.save();

    return token;
}


//It is a function that reduces the account entry right by one.
const reduceTheRightOfEntry = async (user) => {

    if (await isAccountBlock(user)) {
        throw 'Your account is locked'
    }

    if (user.right_of_entry !== 0) {
        const decreased = await user.right_of_entry - 1;

        await User.findOneAndUpdate({ id: user.id }, { right_of_entry: decreased });

    } else if (user.right_of_entry === 0) {
        accountBlock(user);
    }

};

//It is a function that blocks the account.
const accountBlock = async (user) => {
    await User.findOneAndUpdate({ email: user.email }, { isBlocked: true });
};


module.exports = {
    fetchUser, generateToken, accountBlock, reduceTheRightOfEntry
};
