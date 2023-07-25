const nodemailer = require('nodemailer');
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'codexprt4@gmail.com',
    pass: 'qhlpiihkhjonvgoo',
  },
});

const sendMail = async (to, subject, html) => {
  let info = await transporter.sendMail({
    from: 'codexprt4@gmail.com', // sender address
    to,
    subject,
    html,
  });

  console.info('info.messageId : ', info.messageId);
};

module.exports = sendMail;
