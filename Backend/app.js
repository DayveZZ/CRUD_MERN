const express = require("express");
const cors = require("cors");
const app = new express();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/MERN1stDB")
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("error===>", err);
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
    required: true,
  },
});

const UserModel = mongoose.model("user", userSchema);

app.use(cors());

const basePath = "/users";
app
  .route(basePath)
  .get(async (req, res) => {
    const allUsers = await UserModel.find();
    return res.send(allUsers);
  })
  .post((req, res) => {
    return res.send();
  });

app
  .route(`${basePath}/:id`)
  .get((req, res) => {
    return res.send("Fetch from Frontend");
  })
  .post((req, res) => {
    return res.send("Uploaded to backend");
  });

app.listen(5000);
