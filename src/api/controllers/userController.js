const User = require('../models/User');
const jwt = require('jsonwebtoken');

//import Validation Files
const { validationRegister } = require('../validation/authValidation');

//import Auth Services
const { fetchUser } = require('../services/authServices');

//import Mail Services
//const { sendMailService } = require('../services/mailServices');

//import Utils
const { isExistEmail } = require('../utils/isExist');
const { passwordHashFunction } = require('../utils/hash');

// ===================REGISTER ENDOINT=====================
const register = async (req, res) => {
  const { email, phone, password } = req.body;

  try {
    await validationRegister(email, phone);
    await isExistEmail(email, { returnType: 'Error' });

    const newPassword = await passwordHashFunction(password);
    const newUser = new User({ ...req.body, password: newPassword });

    await newUser.save();

    return res.status(201).send(newUser);
  } catch (err) {
    return res.status(500).send(err);
  }
};

// ===================LOGIN ENDOINT=======================
const login = async (req, res) => {};

module.exports = {
  register,
  login
};
