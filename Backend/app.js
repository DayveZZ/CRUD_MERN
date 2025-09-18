const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routers/userRoutes");
const dbConnection = require("./connections");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// mongoose
//   .connect("mongodb://127.0.0.1:27017/crudDB")
dbConnection()
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Error occured", err);
  });

app.use("/api/users", userRoutes);
app.listen(8000, () => {
  console.log("Server running on port 8000");
});
