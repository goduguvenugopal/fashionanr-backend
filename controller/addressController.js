const Address = require("../model/Address");
const User = require("../model/User");

// post method controlller logic

const saveAddress = async (req, res) => {
  try {
    const { name, mobile, code, address } = req.body;
    const userId = await User.findById(req.user);
    if (!userId) {
      res.status(404).json({ message: "user not found " });
    }

    const saveAdd = new Address({
      name,
      mobile,
      code,
      address,
      user: userId._id,
    });

    await saveAdd.save();
    res.status(201).json({ message: "address has saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json("intenal server error");
  }
};

module.exports = { saveAddress };
