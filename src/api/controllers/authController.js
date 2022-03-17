const User = require('../models/User');

//import Validation Files
//const {validationRegister} = require('../validation/authValidation');

//import Services
const {
  fetchUser,
  generateLoginToken,
  generateVerifyToken,
  decreaseTheRightOfEntry,
  verifiyAccount
} = require('../services/authServices');

const { sendMailService } = require('../services/mailServices');

//import Utils
const { passwordHashFunction, passwordCompare } = require('../utils/hash');

// =====================REGISTER ENDOINT===================
const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const newPassword = await passwordHashFunction(password);
    const newUser = { ...req.body, password: newPassword };

    const isExist = await User.findOne({ email });

    if (isExist) {
      return res.status(500).send('Such a user is already registered.');
    }

    const token = await generateVerifyToken({ ...req.body });

    await sendMailService(
      newUser,
      '🚀 Pro-Intern E-posta Doğrulama',
      `<a>${process.env.DEV_HOST}/activate/${token}</a>`
    );

    await User.create(newUser);

    return res.status(201).send(newUser);
  } catch (err) {
    return res.status(500).send(err);
  }
};

// =====================LOGIN ENDOINT======================
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await fetchUser(email);

    if (!user.isVerified) {
      return res.status(500).send('Please verify your account.');
    }

    if (!(await passwordCompare(password, user.password))) {
      await decreaseTheRightOfEntry(user);

      return res.status(500).send('Your password or email address is incorrect. Please try again.');
    }

    const token = await generateLoginToken(user);

    return res.status(200).send({ token });
  } catch (err) {
    return res.status(500).send(err);
  }
};

// =====================ACTIVATE ACCOUNT ENDOINT===========
const activateAccount = async (req, res) => {
  try {
    await verifiyAccount(req.user);

    return res.status(200).send('Successfully activate account...');
  } catch (err) {
    return res.status(500).send(err);
  }
};

// =====================PROFILE ENDOINT====================
const profile = async (req, res) => res.status(200).send(req.user);

module.exports = {
  register,
  login,
  profile,
  activateAccount
};
