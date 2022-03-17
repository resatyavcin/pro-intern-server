//import Models
const User = require('../models/User');

const isAccountBlock = async (user) => {
  const fetchedUser = await User.findOne({ email: user.email }, 'isBlocked');

  return fetchedUser.isBlocked;
};

module.exports = { isAccountBlock };
