const express = require("express");
const {
  registerUser,
  authUser,
  allUser,
} = require("../controller/userController");
const { protect } = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/", registerUser);
router.post("/login", authUser);
router.get("/", protect, allUser);

module.exports = router;
