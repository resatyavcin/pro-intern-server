const User = require('../models/User');
const jwt = require('jsonwebtoken');

//import Validation Files
const { validationRegister } = require('../validation/authValidation');

//import Auth Services
const { fetchUser, generateToken, reduceTheRightOfEntry } = require('../services/authServices');

//import Mail Services
//const { sendMailService } = require('../services/mailServices');

//import Utils
const { isExistEmail } = require('../utils/isExist');
const { passwordHashFunction, passwordCompare } = require('../utils/hash');

// ===================REGISTER ENDOINT=====================
const register = async (req, res) => {
    const { email, phone, password } = req.body;

    try {
        //await validationRegister(email, phone);
        await isExistEmail(email, { returnType: 'Error' });

        const newPassword = await passwordHashFunction(password);
        const newUser = { ...req.body, password: newPassword };

        await User.create(newUser);

        return res.status(201).send(newUser);
    } catch (err) {
        return res.status(500).send(err);
    }
};

// ===================LOGIN ENDOINT=======================
const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        //await validationRegister(email);

        const user = await fetchUser(email);

        if (!await passwordCompare(password, user.password)) {
            await reduceTheRightOfEntry(user);

            return res.status(500).send("Your password or email address is incorrect. Please try again.")
        }

        const token = await generateToken(user);

        return res.status(200).send({ token });
    } catch (err) {
        return res.status(500).send(err)
    }

};

const readProfile = async (req, res)=>{
    res.send('Merhaba')
}

module.exports = {
    register, login, readProfile
};
