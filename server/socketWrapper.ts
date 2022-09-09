import { Server, Socket } from "socket.io";
import { formatMessage } from "../utils/messages";
import http from "http";

export let io: Server;

export const run = (server: http.Server) => {
  const botName = "ChatCord Bot";
  io = new Server(server, {});

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

    socket.on('user:updated', (msg) => {
        io.emit("message", formatMessage("user", msg));
    })
  });
};
