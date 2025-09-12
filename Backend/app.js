const express = require("express");
const cors = require("cors");
const app = new express();
const users = require("./MOCK_DATA.json");
const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: false }));
app.use(cors());
mongoose
  .connect("mongodb://127.0.0.1:27017/crudDB")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Error occured", err);
  });

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
  },
});

const userModel = mongoose.model("user", userSchema);

const basePath = "/api/users";

app
  .route(basePath)
  .get(async (req, res) => {
    try {
      const allUsers = await userModel.find();
      return res.send(allUsers);
    } catch (err) {
      return res.status(500).json({ status: "Error", message: err.message });
    }
  })
  .post(async (req, res) => {
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
  });

app
  .route(`${basePath}/:id`)
  .get((req, res) => {
    return res.json({ message: "Success !!!" });
  })
  .patch((req, res) => {
    return res.json({ status: "Updated Successfully !!!" });
  })
  .delete(async (req, res) => {
    const id = res.params.id;
    const user = userModel.findByIdAndDelete(id);
    return res
      .status(410)
      .json({ status: "Deleted", message: "User deleted successfully !!!" });
  });

app.listen(8000);
