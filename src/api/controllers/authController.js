const Student = require('../models/Student');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

//import Validation Files
//const {validationRegister} = require('../validation/authValidation');

//import Services
const {
    fetchUser,
    generateLoginToken,
    generateVerifyToken,
    reduceTheRightOfEntry,
    verifiyAccount
} = require('../services/authServices');
const {sendMailService} = require('../services/mailServices');

//import Utils
const {passwordHashFunction, passwordCompare} = require('../utils/hash');

// =====================REGISTER ENDOINT===================
const register = async (req, res) => {
    const role = req.query.role;

    if (!role) {
        return res.status(500).send("Role parameter not sent")
    }

    const {email, phone, password} = req.body;

    try {

        const newPassword = await passwordHashFunction(password);
        const newUser = {...req.body, password: newPassword};

        if (role.toString() === 'student') {
            const isExist = await Student.findOne({email});

            if (isExist) {
                return res.status(500).send("Such a user is already registered.")
            }

            const parameterToSend = {...req.body, role};
            const token = await generateVerifyToken(parameterToSend);

            await sendMailService(newUser,
                "🚀 Pro-Intern E-posta Doğrulama",
                `<a>${process.env.DEV_HOST}/activate/${token}</a>`
            );
            await Student.create(newUser);

        }
        if (role.toString() === 'admin') {
            const isExist = await Admin.findOne({email});

            if (isExist) {
                return res.status(500).send("Such a user is already registered.")
            }

            const parameterToSend = {...req.body, role};
            const token = await generateVerifyToken(parameterToSend);

            await sendMailService(newUser,
                "🚀 Pro-Intern E-posta Doğrulama",
                `<a>${process.env.DEV_HOST}/activate/${token}</a>`
            );
            await Admin.create(newUser);
        }

        return res.status(201).send(newUser);
    } catch (err) {
        return res.status(500).send(err);
    }
};

// =====================LOGIN ENDOINT======================
const login = async (req, res) => {
    const role = req.query.role;

    if (!role) {
        return res.status(500).send("Role parameter not sent")
    }


    const {email, password} = req.body;

    try {
        const user = await fetchUser(role, email);

        if (!(await passwordCompare(password, user.password))) {
            await reduceTheRightOfEntry(role, user);

            return res.status(500).send('Your password or email address is incorrect. Please try again.');
        }

        const token = await generateLoginToken(role, user);

        return res.status(200).send({token});
    } catch (err) {
        return res.status(500).send(err);
    }
};

// =====================ACTIVATE ACCOUNT ENDOINT===========
const activateAccount = async (req, res) => {
    try {
        await verifiyAccount(req.user);

        return res.status(200).send("Successfully activate account...")
    } catch (err) {
        return res.status(500).send(err);

    }
}
// =====================PROFILE ENDOINT====================
const profile = async (req, res) => res.status(200).send(req.user)

module.exports = {
    register,
    login,
    profile,
    activateAccount
};
