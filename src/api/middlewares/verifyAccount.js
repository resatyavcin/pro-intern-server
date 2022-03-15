const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Admin = require('../models/Admin');


const verifyAccount = async (req, res, next) => {

    const token = req.params.token;

    try {
        const decoded = await jwt.verify(token, process.env.VERIFY_ACCOUNT_KEY);

        const decodedUser = await decoded.user;


        if (decodedUser.role === 'admin') {

            const user = await Admin.findOne({ email: decodedUser.email });

            if (!user) {
                throw new Error();
            }

            req.user = { ...user.toObject(), role: decodedUser.role };

            next();

        }

        if (decodedUser.role === 'student') {

            const user = await Student.findOne({ email: decodedUser.email });

            if (!user) {
                throw new Error();
            }

            req.user = { ...user.toObject(), role: decodedUser.role };

            next();

        }


    } catch (err) {
        res.status(401).send("Please verify account");
    }


}

module.exports = verifyAccount;