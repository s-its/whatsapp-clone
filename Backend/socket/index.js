const express = require("express");
const { server } = require("socket.io");
const http = require("http");
const UserModel = require("../models/userModel");
const messageModel = require("../models/messageModel");
const conversationModel = require("../models/conversationModel");
const app = express();

// socket connection

const server = http.createServer(app);

const io = new server(server, {
  cors: {
    origin: process.env.FRONTED_URL,
    Credentials: true,
  },
});

// online users

const onlineUsers = new Set();
io.on("connection", async (socket) => {
  const token = socket.handshake.auth.token;
  console.log(tocken, "token");
  const user = await getUserByToken(token);

  // join room
  socket.join(user?._id?.toString());
  onlineUsers.push(user?._id?.toString());
  io.emit("onlineUser", Array.from(onlineUsers));

  // message page
  socket.on("messagePage", async (userId) => {
    const userDetails = await UserModel.findById(userId);
    const data = {
      _id: userDetails?._id,
      name: userDetails?.name,
      email: userDetails?.email,
      profilePic: userDetails?.profilePic,
      online: onlineUsers?.has(userId),
    };
    socket.emit("messageUser", data);

    // old messages

    const getConMessage = await conversationModel
      .findOne({
        $or: [
          { sender: user?._id, receiver: userId },
          { sender: user?._id, receiver: _id },
        ],
      })
      .populate("messages")
      .sor({ updateAt: -1 });

    socket.emit("message", getConMessage?.messages || []);
  });

  // new message
  socket.on("newMessage", async (data) => {
    let conversation = await conversationModel.findOne({
      $or: [
        { sender: data?.sender, receiver: data?.receiver },
        { sender: data?.receiver, receiver: data?.sender },
      ],
    });
    if (!conversation) {
      conversation = await ConversationModel.create({
        sender: data?.sender,
        receiver: data?.receiver,
      });
    }
    const message = await MessageModel.create({
      text: data?.text,
      imageUrl: data?.imageUrl,
      videoUrl: data?.videoUrl,
    });
    if (message) {
      await ConversationModel.updateOne(
        { _id: conversation?._id },
        { 
            $push: { message: message?._id } 
        }
      );
      const getUpdatedConversation = await ConversationModel.findOne({
        $or:[
            {sender: data?.sender, receiver:data?.receiver},
            {sender: data?.receiver, receiver:data?.sender},
        ]
      })
      .populate("messages")
      .sort({updated : -1});

      io.to(data?.sender).emit("message", getUpdatedConversation?.messages || []);

    }
  });io.to(data?.receiver).emit("message" , getUpdatedConversation?.messages || []);

    //    send conversation to fronted
    const sendConv = await getUpdatedConversation(data?.sender);

});
