const nodeMailer = require("nodemailer");
const dotEnv = require("dotenv");

dotEnv.config();

const sendMail = async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    // createTranspoter

    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // mail options

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: text,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    res.status(500).send("Error sending email: ", error.message);
  }
};


module.exports = sendMail
