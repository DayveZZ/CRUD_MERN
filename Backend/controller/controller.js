const userModel = require("../model/userSchema");

async function getAllUsers(req, res) {
  try {
    const allUsers = await userModel.find();
    return res.send(allUsers);
  } catch (err) {
    return res.status(500).json({ status: "Error", message: err.message });
  }
}

async function createUser(req, res) {
  console.log(req.body);

  // Validate required fields
  if (
    !req.body ||
    !req.body.first_name ||
    !req.body.email ||
    !req.body.gender
  ) {
    return res.status(400).json({
      status: "Invalid request",
      message: "Something is missing !!!",
    });
  }

  // Check for duplicate email
  const existingUser = await userModel.findOne({ email: req.body.email });

  if (existingUser) {
    return res
      .status(409)
      .json({ status: "Conflict", message: "Email already exists" });
  }
  const result = await userModel.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    gender: req.body.gender,
  });
  res
    .status(200)
    .json({ status: "Success", message: "User created successfully !!!" });
}

async function getUserByID() {
  (req, res) => {
    return res.json({ message: "Success !!!" });
  };
}
async function patchUserByID() {
  (req, res) => {
    return res.json({ status: "Updated Successfully !!!" });
  };
}

async function deleteUserByID(req, res) {
  const id = req.params.id;
  const user = await userModel.findByIdAndDelete(id);
  return res
    .status(200)
    .json({ status: "Deleted", message: "User deleted successfully !!!" });
}

module.exports = {
  getAllUsers,
  createUser,
  getUserByID,
  patchUserByID,
  deleteUserByID,
};
