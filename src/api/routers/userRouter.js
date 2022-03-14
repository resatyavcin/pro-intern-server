const express = require('express');
const router = express.Router();

const { login, register, readProfile } = require('../controllers/userController');

//Middlewares
const passport = require('passport');
const specialPermission = require('../middlewares/specialPermission');


router.post('/register', register);
router.get('/login', login);
router.get('/readme', passport.authenticate('jwt',{ session: false }), specialPermission('admin'), readProfile);

module.exports = router;
