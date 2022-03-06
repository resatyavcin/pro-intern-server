const express = require('express');
const router = express.Router();

const {
  login,
  register,
  activateAccount,
  sendPasswordResetEmail,
  receiveNewPassword
} = require('../controllers/userController');

router.post('/register', register);
router.post('/register', activateAccount);
router.get('/login', login);


router.post('/reset-password/:email', sendPasswordResetEmail);
router.post('/reset-password/:user-id/:email', receiveNewPassword);

module.exports = router;
