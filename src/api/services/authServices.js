//import Models
const User = require('../models/User');

const fetchUser = (email) => {
  const user = User.findOne({ email });

  return user;
};

const accountBlock = async (user) => {
  await User.findOneAndUpdate({ email: user.email }, { isBlocked: true });
};

const reduceTheRightOfEntry = async (user) => {
  if (user.right_of_entry !== 0) {
    const decreased = (await user.right_of_entry) - 1;

    user = await { ...user, remainingEntry: decreased };

    await user.save();
  }
};

module.exports = {
  fetchUser,
  accountBlock,
  reduceTheRightOfEntry
};
