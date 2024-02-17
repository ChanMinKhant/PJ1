const jwt = require('jsonwebtoken');
const Token = require('../models/tokenModel');
const nodemailer = require('nodemailer');

exports.signToken = (user_id) => {
  try {
    return jwt.sign({ id: user_id }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRES_IN || '3d',
    });
  } catch (err) {
    console.log('sign jwt error', err);
  }
};

exports.saveToken = async (user_id, token, expires) => {
  try {
    await Token.create({
      user_id,
      token,
      expiresAt: new Date(
        Date.now() +
          1000 *
            60 *
            60 *
            24 *
            parseInt(process.env.TOKEN_EXPIRES_IN || expires || 3)
      ),
    });
  } catch (err) {
    console.log('save token error', err);
  }
};

exports.forgotPasswordEmailTemplate = (token, username) => {
  return `
    <!DOCTYPE html>
    <html>
    <body>
      <div
        style="
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
          width: 400px;
          text-align: center;
        "
      >
        <h2 style="font-size: 24px; font-weight: bold; color: #333">
          Reset Your Password
        </h2>
        <p style="font-size: 16px; color: #666">Dear [${username}],</p>
        <p style="font-size: 16px; color: #666">
          We noticed that you recently requested to reset your password for your
          account. If you did not make this request,
          please disregard this email. No changes will be made to your account.
        </p>
        <p style="font-size: 16px; color: #666">
          To reset your password, click the button below. If you're unable to see
          the button, please copy and paste the following URL into your web
          browser:
        </p>
        <a
          href="${token}"
          style="
            display: inline-block;
            padding: 10px 20px;
            margin-top: 10px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s;
          "
          >Reset Password</a
        >

        <p style="font-size: 16px; color: #666">
        ${token}
          For security reasons, this link will expire in [10min], so
          please reset your password promptly.
        </p>
        <p style="font-size: 16px; color: #666">
          If you did make this request, please click the button and follow the
          instructions to set your new password. Your account security is
          important to us, so be sure to choose a strong, unique password.
        </p>
        <p style="font-size: 16px; color: #666">
          Thank you for choosing [Your Company Name]!
        </p>
        <p style="font-size: 16px; color: #666">
          Best Regards,<br />The [Team] Team
        </p>
      </div>
    </body>
  </html>
  `;
};

exports.examResultEmailTemplate = (student) => {
  return `
  <html>
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  border: 1px solid #ccc;
                  border-radius: 5px;
              }
              .header {
                  text-align: center;
                  margin-bottom: 20px;
              }
              .message {
                  margin-bottom: 20px;
              }
              .signature {
                  font-weight: bold;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h2>Important Notification</h2>
              </div>
              <div class="message">
                  <p>Dear ${student.studentName},</p>
                  <p>This is to inform you about an important update regarding your ${student.year} ${student.semester} ${student.major} semester.</p>
                  <p>Please review the attached file for further details.</p>
                  <p>Best Regards,</p>
                  <p class="signature">Admin</p>
              </div>
          </div>
      </body>
  </html>
`;
};

exports.sendEmail = async (options) => {
  try {
    if (!options.email) {
      throw new Error('Please provide email');
    }

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `Website Name <${process.env.EMAIL_USERNAME}>`,
      to: options.email,
      subject: options.subject,
      html: options.message,
      attachments: options.attachments || [], // Add attachments if provided
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Rethrow the error for handling in the calling code
  }
};

// Example usage with attachment
// const attachmentFilePath = './upload/file/result.txt';
// const options = {
//   email: 'recipient@example.com',
//   subject: 'Email with Attachment',
//   message: 'Please see the attached file.',
//   attachments: [
//     {
//       filename: 'result.txt',
//       path: attachmentFilePath,
//     }
//   ],
// };

// Send the email
// sendEmail(options)
