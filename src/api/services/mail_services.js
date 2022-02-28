const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

function configMail(user, token) {
  //const url = `http://localhost:8080/api/user/reset-password/${user._id}/${token}`;
  const mailOptions = {
    from: '"Pro-Intern" insupcy@gmail.com',
    to: `${user.email}`,
    subject: '🌻 Backwoods Password Reset 🌻',
    attachments: [{ fileName: 'mail_template.pug', path: '../../../views/mail_template.pug' }]
  };

  return mailOptions;
}

function sendMailService({ user, token }) {
  // send mail with defined transport object
  transporter.sendMail(configMail(user, token), function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
}

module.exports = {
  sendMailService
};
