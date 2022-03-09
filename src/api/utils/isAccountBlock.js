//import Models
const User = require('../models/User');

const isAccountBlock = async (user) => {
    const fetchedUser = await User.findOne({ id: user.id });

    const isBlock = fetchedUser.isBlocked;

    return isBlock;
}

module.exports = { isAccountBlock };