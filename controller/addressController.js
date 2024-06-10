const Address = require("../model/Address");
const User = require("../model/User");

// post method controlller logic

const saveAddress = async (req, res) => {
  try {
    const { name, mobile, code, address, userId } = req.body;

    const saveAdd = new Address({
      name,
      mobile,
      code,
      address,
      userId,
    });

    await saveAdd.save();
    res.status(201).json({ message: "address has saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json("intenal server error");
  }
};

// get addresses controller code

const getAddress = async (req, res) => {
  try {
    const id = req.params.userId;
    const userAddress = await Address.findById(id);

    if (!userAddress) {
      res.status(404).json({ message: "user not found" });
    }

    res.status(200).json(userAddress);
  } catch (error) {
    console.log(error);
    res.status(500).json("intenal server error");
  }
};

module.exports = { saveAddress , getAddress};
