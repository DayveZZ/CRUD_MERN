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
    unique: ture,
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
    return res.send(users);
  })
  .post((req, res) => {
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
    const existingUser = users.find((user) => user.email === req.body.email);

    if (existingUser) {
      return res
        .status(409)
        .json({ status: "Conflict", message: "Email already exists" });
    }
  });

app
  .route(`${basePath}/:id`)
  .get((req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id == id);
    return res.json(user);
  })
  .patch((req, res) => {
    return res.json({ status: "Updated Successfully !!!" });
  })
  .delete((req, res) => {
    return res.status(410).json({ status: "Deleted Successfully !!!" });
  });

app.listen(8000);
