const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  getUserByID,
  patchUserByID,
  deleteUserByID,
} = require("../controller/controller");

router("/").get(getAllUsers).post(createUser);

router
  .route(`/:id`)
  .get(getUserByID)
  .patch(patchUserByID)
  .delete(deleteUserByID);

router.listen(8000);

module.exports = router;
