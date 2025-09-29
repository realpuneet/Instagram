const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (to, subject, htmlContent) => {
  const info = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: htmlContent,
  };

  return await transporter.sendMail(info);
};

module.exports = { sendMail };
