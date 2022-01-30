const express = require('express');
const passport = require('passport');

const router = express.Router();

const { login, login_current, register } = require('../controller/user_controller');

router.get('/login', login);
router.get('/login/current', passport.authenticate('jwt', { session: false }), login_current);

router.post('/register', register);

module.exports = router;
