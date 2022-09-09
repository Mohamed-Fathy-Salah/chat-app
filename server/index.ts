import path from "path";
import express from "express";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import { formatMessage } from "./utils/messages";
import { app } from "./app";
import { sequelize } from "./models/sequelize-wrapper";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  const server = createServer(app);

  const botName = "ChatCord Bot";

  const io = new Server(server, {});

  io.on("connection", (socket: Socket) => {
    socket.emit("message", "welcome to chatcord!");

    socket.broadcast.emit(
      "message",
      formatMessage(botName, "a user has joined the chat")
    );

    socket.on("disconnect", () => {
      io.emit("message", formatMessage(botName, "a user has left the chat"));
    });

    socket.on("chatMessage", (msg) => {
      io.emit("message", formatMessage("user", msg));
    });
  });

  app.use(express.static(path.join(__dirname, "..", "client")));

  await sequelize.sync();

  server.listen(3000, async () => {
    console.log("listening on port 3000");
  });
};

start();
