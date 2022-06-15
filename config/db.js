const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(process.env.DB_STRING, function (err) {
    if (err) {
      return 'Unseccess';
    }
    console.log('Successfully connected db');
  });
};
