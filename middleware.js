const dotEnv = require("dotenv");
const jwt = require("jsonwebtoken");

dotEnv.config();

const secretKey = process.env.MYNAME;

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      res.status(404).json({ message: "token not found" });
    }

    const decoded = jwt.verify(token, secretKey);

    req.user = decoded.user;

    next()
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};


module.exports = verifyToken