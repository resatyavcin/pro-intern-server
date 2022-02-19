const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { sendMailService } = require('../services/mail_services');


// ===================REGISTER ENDOINT=====================
const register = async (req, res) => {
  const { email, password, passwordConfirm } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      return res.send('This email is already exist.');
    }

    if (password !== passwordConfirm) {
      return res.send('Sorry, the passwords you entered do not match.');
    }

    const newUser = new User({ ...req.body });

    newUser.passwordHashed();

    const createdUser = await User.create(new_user);

    return res.send(createdUser.hidePassword());
  } catch (err) {
    return res.json({
      message: 'Something went wrong.',
      error: err
    });
  }
};

// =================LOGIN ENDOINT=====================
const login = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: email, username: username }]
    });

    if (!user) {
      return res.send('No user was found according to the email you entered.');
    }

    if (user.passwordCompare(password, user.password) && user.right_of_entry !== 0) {
      const token = jwt.sign(
        user.hidePassword(),
        process.env.SECRET_KEY,
        { expiresIn: 60 * 60 * 24 * 60 } // 24 hours
      );

      return res.send({
        message: 'Succesfully login',
        token: 'Bearer ' + token
      });
    } else {
      if (user.right_of_entry === 0) {
        await User.findOneAndUpdate({ email: user.email }, { isBlocked: true });

        return res.send('Sorry, your account has been locked because you entered it incorrectly 3 times in a row.');
      }

      const remainingEntry = (await user.right_of_entry) - 1;

      await User.findOneAndUpdate({ email: user.email }, { right_of_entry: remainingEntry });

      return res.send('Sorry, you entered the wrong password');
    }
  } catch (err) {
    return res.json({
      message: 'Something went wrong.',
      error: err
    });
  }
};

// =================LOGIN CURRENT ENDOINT=====================
const loginCurrent = async (req, res) => {
  return res.send(req.user);
};

const usePasswordHashToMakeToken = ({ password: passwordHash, _id: userId, createdAt }) => {
  // highlight-start
  const secret = passwordHash + '-' + createdAt;
  const token = jwt.sign({ userId }, secret, {
    expiresIn: 3600 // 1 hour
  });

  // highlight-end
  return token;
};

// =================PASSWORD RESET MAIL ENDPOINT=====================
const sendPasswordResetEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.send('No user was found according to the email you entered.');
    }

    const token = usePasswordHashToMakeToken(user);

    sendMailService({
      user: user,
      token: token
    });

    return res.send('We have sent a reset e-mail to your registered e-mail to reset your password.');
  } catch (err) {
    return res.json({
      message: 'Something went wrong.',
      error: err
    });
  }
};

// =================PASSWORD RESET MAIL ENDPOINT=====================
const receiveNewPassword = async (req, res) => {
  try {
    console.log('first');

    return res.send('We have sent a reset e-mail to your registered e-mail to reset your password.');
  } catch (err) {
    return res.json({
      message: 'Something went wrong.',
      error: err
    });
  }
};

module.exports = {
  register,
  login,
  loginCurrent,
  sendPasswordResetEmail,
  receiveNewPassword
};
