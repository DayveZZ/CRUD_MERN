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
  .get(async (res, req) => {
    const allUsers = await UserModel.find();
    return res.send(allUsers);
  })
  .post((res, req) => {
    return res.send();
  });

app
  .route(`${basePath}/:id`)
  .get((res, req) => {
    return res.send();
  })
  .post((res, req) => {
    return res.send();
  });

app.listen(8000);
