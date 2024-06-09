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
      from: to,
      to: process.env.EMAIL_USER,
      subject: subject,
      text: text,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error", error });
  }
};

module.exports = sendMail;
