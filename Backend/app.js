const express = require("express");
const cors = require("cors");
const app = new express();
const users = require("./MOCK_DATA.json");

app.use(cors());

const basePath = "/api/users";
app
  .route(basePath)
  .get(async (req, res) => {
    return res.send(users);
  })
  .post((req, res) => {
    return res.send("Upload Successfully !!!");
  });

app
  .route(`${basePath}/:id`)
  .get((req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id == id);
    return res.json(user);
  })
  .patch((req, res) => {
    return res.send("Updated Successfully !!!");
  })
  .delete((req, res) => {
    return res.send("Deleted Successfully !!!");
  });

app.listen(8000);
