const express = require("express");
const { protect } = require("../middleware/authmiddleware");
const { sendMessage, allMessages } = require("../controller/messageController");
const router = express.Router();

router.post("/", protect, sendMessage);
router.get("/:chatId", protect, allMessages);

module.exports = router;
