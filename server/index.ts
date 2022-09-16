import { createServer } from "http";
import { sequelize } from "./models/sequelize-wrapper";
import { app } from "./app";
import { Server, Socket } from "socket.io";
import { formatMessage } from "../utils/messages";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  const server = createServer(app);

  const botName = "ChatCord Bot";
  const io = new Server(server, { cookie: true });

  io.on("connection", (socket: Socket) => {
    socket.emit("message", formatMessage(botName, "welcome to chatcord!"));

    socket.broadcast.emit(
      "message",
      formatMessage(botName, "a user has joined the chat")
    );

    socket.on("disconnect", () => {
      io.emit("message", formatMessage(botName, "a user has left the chat"));
    });

    socket.on("chatMessage", (msg) => {
      console.log("chat message from server", msg);
      io.emit("message", formatMessage("user", msg));
    });
  });

  await sequelize.sync();

  server.listen(3000, async () => {
    console.log("listening on port 3000");
  });
};

start();
