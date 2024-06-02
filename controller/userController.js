const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");

dotEnv.config();

const secretKey = process.env.MYNAME;

const signUpUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });

    if (exists) {
      res.status(404).json({ message: "user name already existed" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const users = new User({
      name,
      email,
      password: hashedPassword,
    });

    await users.save();
    res.status(200).json({ message: "user signed up successfully", users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server Error" });
  }
};

// user login logic
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exists = await User.findOne({ email });

    if (!exists || !(await bcrypt.compare(password, exists.password))) {
      res
        .status(401)
        .json({ message: "user not found and password not matched " });
    }

    const token = jwt.sign({ user: exists._id }, secretKey);

    res.status(200).json({ token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ messsage: "internal server error" });
  }
};

// get user details logic

const getUser = async (req, res) => {
  try {
    const singleUser = await User.findById(req.user);

    if (!singleUser) {
      res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(singleUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

// update Password logic

const updatePassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exists = await User.findOne({ email });
    if (!exists) {
      res.status(404).json({ message: "user not found with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { email: email },
      { $set: { password: hashedPassword } },
      { new: true }
    );
    res.status(200).json({ message: "password updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

// delete user by id

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = { signUpUser, loginUser, getUser, updatePassword, deleteUser };
