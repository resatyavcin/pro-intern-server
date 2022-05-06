const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyAccount = async (req, res, next) => {
  const token = req.query.token;
  const decoded = jwt.verify(token, process.env.VERIFY_ACCOUNT_KEY);

  const decodedUser = decoded.user;
  const user = await User.findOne({ email: decodedUser.email });

  if (!user) {
    return res.status(500).send();
  }

  req.user = user;
  next();
};

module.exports = verifyAccount;
