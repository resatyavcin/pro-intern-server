//import models
const User = require('../models/User');

const isExistEmail = async (email, { returnType: returnType }) => {
  const user = await User.findOne({ email });

  if (!user && returnType !== 'Error') {
    return;
  }

  if (user && returnType === 'Error') {
    throw 'Such a user already exists.';
  }
};

module.exports = {
  isExistEmail
};
