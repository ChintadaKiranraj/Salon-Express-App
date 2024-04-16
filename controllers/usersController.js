const { User } = require("../models/User");
const createUser = async (req, res) => {
  try {
    const {
      user_name,
      password,
      phone_number,
      confirm_password,
      user_type,
      first_name,
      last_name,
      email_id,
    } = req.body;
    const user = new User({
      user_name,
      password,
      phone_number,
      confirm_password,
      user_type,
      first_name,
      last_name,
      email_id,
    });

    await user.save();
    res.status(201).send({ message: "User created successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  }
};

const getUsers = async (req, res) => {
  try {
    const user = await User.findAll();
    res.send(user);
  } catch (e) {
    res.send(500);
  }
};
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);

    if (!user) {
      res.send({ status: 401, message: "user not found" });
    }
    res.send({status:200,message:"fetched user details successfully",data:user});
  } catch (e) {
    res.send({status:500,message:"failed to fet user details"});
  }
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const {first_name}=req.body
  try {
    const user = await User()

    if (!user) {
      res.send({ status: 401, message: "user not found" });
    }
    res.send({status:200,message:"fetched user details successfully",data:user});
  } catch (e) {
    res.send({status:500,message:"failed to fet user details"});
  }
};




module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser
};
