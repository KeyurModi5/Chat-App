const express = require("express");
const { chats } = require("./data/data");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const chatRouter = require("./routes/chatRouter");
const messageRouter = require("./routes/messageRouter");
// app.use(
//   cors({
//     origin: "*",
//     methods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
//     allowedHeaders: "*",
//   })
// );
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello");    
});
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);
connectDB();
let port = process.env.PORT || 5000;
const server = app.listen(port, console.log(`server running on ${port}`));
const io = require("socket.io")(server, {
  pingTimeout: 600000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));

  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
});
