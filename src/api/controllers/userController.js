const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { sendMailService } = require('../services/mailServices');


// ===================REGISTER ENDOINT=====================
const register = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.send('This email is already exist.');
    }

    const newUser = new User({ ...req.body });

    await newUser.passwordHashed();

    const createdUser = await User.create(newUser);


    return res.send(createdUser);
  } catch (err) {
    return res.json({
      message: 'Something went wrong.',
      error: err
    });
  }
};

// =================LOGIN ENDOINT=====================
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.send('No user was found according to the email you entered.');
    }

    const activateTemplate = (string) => `Activate Token: <a href="${string}">Activate</a>`

    if (user.passwordCompare(password, user.password) && user.right_of_entry !== 0) {

      const token = jwt.sign(
          { user },
          process.env.SECRET_KEY,
          { expiresIn: 60 * 60 * 24 * 60 }); // 24 hours

      if(process.env.NODE_ENV === 'development'){
        sendMailService(user, activateTemplate(process.env.DEV_HOST));
      }else if(process.env.NODE_ENV === 'development'){
        sendMailService(user, activateTemplate(process.env.PROD_HOST));
      }


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


// =================ACTIVATE ACCOUNT ENDOINT=====================
const activateAccount = async (req, res) => {

}





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
    const user = await User.findOne({ email });

    if (!user) {
      return res.send('No user was found according to the email you entered.');
    }

    const token = usePasswordHashToMakeToken(user);

    sendMailService({
      user,
      token
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
  activateAccount,
  sendPasswordResetEmail,
  receiveNewPassword
};
