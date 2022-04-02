const User = require('../models/User');
const Intern = require('../models/Intern');

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
    const isExist = await User.findOne({ email });

    if (isExist) {
      return res.status(500).send('RESPONSE.ALREADY_EXIST');
    }

    const newPassword = await passwordHashFunction(password);
    const newUser = new User({ ...req.body, password: newPassword });

    const token = await generateVerifyToken({ ...req.body });

    await newUser.save();

    await sendMailService(
      newUser,
      '🚀 Pro-Intern E-posta Doğrulama',
      `<a>${process.env.DEV_HOST}/auth/activate?token=${token}</a>`
    );

    return res.status(201).send('RESPONSE.SUCCESS');
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
      return res.status(500).send('RESPONSE.USER_NOT_FOUND');
    }

    if (!(await passwordCompare(password, user.password))) {
      await decreaseTheRightOfEntry(user);

      return res.status(500).send('RESPONSE.USER_OR_PASS_WRONG');
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
const profile = async (req, res) => {
  try {
    const data = await User.findOne({ id: req.user._id }).populate('interns');

    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  register,
  login,
  profile,
  activateAccount
};
