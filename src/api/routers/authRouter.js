const express = require('express');
const router = express.Router();

const { login, register, profile, activateAccount } = require('../controllers/authController');

//Middlewares
const passport = require('passport');
const verifyAccount = require('../middlewares/verifyAccount');

router.post('/register', register);
router.post('/login', login);

router.patch('/activate', verifyAccount, activateAccount);

router.get('/me', passport.authenticate('jwt', { session: false }), profile);

module.exports = router;
