//nodemailer for email sent

const nodemailer = require('nodemailer');
// // .env is __dirname + '../.env
// const dotenv = require('dotenv');
// dotenv.config({ path: '../.env' });

// const sendEmail = async () => {
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: '123 support<fd@123.com>',
//     to: 'jiyonfire@gmail.com',
//     subject: 'test email',
//     text: 'test email',
//   };
//   await transporter.sendMail(mailOptions);
// };

// try {
//   sendEmail();
// } catch (err) {
//   console.log(err);
// }

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: '',
  },
});

var mailOptions = {
  from: '',
  to: '',
  subject: "I've achieved something!",
  html: `
    <html>
      <body style="font-family: Arial, sans-serif; text-align: center;">
        <div style="background-color: #f2f2f2; padding: 20px;">
          <h1 style="color: #007acc;">Hello, ChueLaeShoon!</h1>
        </div>
        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #ddd;">
          <p>Congratulations on sending your first email through programming!</p>
          <p>I&apos;ve achieved something. Keep coding and creating!</p>
        </div>
        <div style="background-color: #f2f2f2; padding: 20px;">
          <p style="color: #333;">Best regards,</p>
          <p style="color: #007acc;"><strong>Chan Min</strong></p>
        </div>
      </body>
    </html>
  `,
};

// Add your email credentials and sending logic here.

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
