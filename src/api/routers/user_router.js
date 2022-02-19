const express = require('express');
const passport = require('passport');

const router = express.Router();

const { login, loginCurrent, register, sendPasswordResetEmail, receiveNewPassword } = require('../controllers/user_controller');

router.get('/login', login);
router.get('/login/current', passport.authenticate('jwt', { session: false }), loginCurrent);

router.post('/register', register);
router.post('/reset-password/:email', sendPasswordResetEmail);
router.post('/reset-password/:user-id/:email', receiveNewPassword);

module.exports = router;
