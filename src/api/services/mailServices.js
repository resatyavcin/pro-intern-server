const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', port: 465, secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS
    }
});

function configMail(user, template) {
    const mailOptions = {
        from: '"Pro-Intern" insupcy@gmail.com',
        to: `${user.email}`,
        subject: '🌻 Backwoods Password Reset 🌻',
        text: 'Hey, There!',
        html: template
    };

    return mailOptions;
}

async function sendMailService(user, template) {
    transporter.sendMail(configMail(user, template), function (err, data) {
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
