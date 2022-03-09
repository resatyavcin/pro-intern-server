const validator = require('validator');

const validationRegister = (email, phone) => {
  if (!validator.isEmail(email)) {
    throw 'The email format you entered is not suitable.';
  }

  if (!validator.isMobilePhone(phone, 'tr-TR')) {
    throw 'The phone format you entered is not suitable.';
  }
};

module.exports = {
  validationRegister
};
