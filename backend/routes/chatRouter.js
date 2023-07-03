const express = require("express");
const { protect } = require("../middleware/authmiddleware");
const {
  accessChat,
  fetchChat,
  createChatGroup,
  renameGroup,
  removeFromGroup,
  addToGroup,
} = require("../controller/chatController");

const router = express.Router();

router.post("/", protect, accessChat);
router.get("/", protect, fetchChat);
router.post("/group", protect, createChatGroup);
router.put("/rename", protect, renameGroup);
router.put("/groupremove", protect, removeFromGroup);
router.put("/groupadd", protect, addToGroup);
module.exports = router;
