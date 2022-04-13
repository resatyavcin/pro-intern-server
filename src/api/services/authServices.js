//import Models
const User = require('../models/User');

//import Utils
const { isAccountBlock } = require('../utils/isAccountBlock');

//import Packages
const jwt = require('jsonwebtoken');

//It is a function for attracting users.
const fetchUser = async (email) => {
  let user;

  user = await User.findOne({ email });

  if (!user) {
    throw 'RESPONSE.USER_NOT_FOUND';
  }

  return user;
};

const generateLoginToken = async (user) => {
  const token = await jwt.sign({ _id: user._id.toString() }, process.env.SECRET_KEY, { expiresIn: '24h' });

  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

const generateVerifyToken = async (body) => {
  const token = await jwt.sign({ user: body }, process.env.VERIFY_ACCOUNT_KEY);

  return token;
};

//It is a function that reduces the account entry right by one.
const decreaseTheRightOfEntry = async (user) => {
  if (await isAccountBlock(user)) {
    throw 'RESPONSE.BLOCK_ACCOUNT';
  }

  if (user.rightOfEntry === 1) {
    await accountBlock(user);
  }

  if (user.rightOfEntry !== 0) {
    await User.findOneAndUpdate({ id: user.id }, { $inc: { rightOfEntry: -1 } });
  }
};

//It is a function that blocks the account.
const accountBlock = async (user) => {
  await User.findOneAndUpdate({ email: user.email }, { isBlocked: true });
};

const verifiyAccount = async (user) => {
  await User.findOneAndUpdate({ email: user.email }, { isVerified: true });
};

module.exports = {
  fetchUser,
  generateLoginToken,
  generateVerifyToken,
  accountBlock,
  verifiyAccount,
  decreaseTheRightOfEntry
};
