const User = require('../model/User');
const jwt = require('jsonwebtoken');

//===================REGISTER ENDOINT=====================
const register = async (req, res) => {
  const { email, password, password_confirm } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      return res.send('This email is already exist.');
    }

    if (password !== password_confirm) {
      return res.send('Sorry, the passwords you entered do not match.');
    }


    const new_user = new User({...req.body});
    
    new_user.passwordHashed();

    const created_user = await User.create(new_user);

    return res.send(created_user.hidePassword());

  } catch (err) {
    return res.json({
      message: 'Something went wrong.',
      error: err
    });
  }
};

//=================LOGIN ENDOINT=====================
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

        if(user.right_of_entry === 0){

            await User.findOneAndUpdate( { email: user.email }, { isBlocked: true });
            
            return res.send('Sorry, your account has been locked because you entered it incorrectly 3 times in a row.');
        }
        
        const remaining_entry = await user.right_of_entry - 1;

        await User.findOneAndUpdate( { email: user.email }, { right_of_entry: remaining_entry});

        return res.send('Sorry, you entered the wrong password');
    }
  } catch (err) {
    return res.json({
      message: 'Something went wrong.',
      error: err
    });
  }
};

//=================LOGIN CURRENT ENDOINT=====================
const login_current = async (req, res) => {
    return res.send(req.user);
};


module.exports = {
  register,
  login,
  login_current
};


