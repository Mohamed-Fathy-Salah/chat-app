import { createServer } from "http";
import { sequelize } from "./models/sequelize-wrapper";
import { app } from "./app";
import { Server, Socket } from "socket.io";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  const server = createServer(app);

  //const botName = "ChatCord Bot";
  //const botPhoto =
  //"https://w7.pngwing.com/pngs/658/334/png-transparent-robot-icon-flat-flat-design-technology-talk-logo-machine-reception-connection.png";

  const io = new Server(server, {});

  io.on("connection", (socket: Socket) => {
    //socket.emit("message", {
    //userId: 0,
    //friendId: 1,
    //groupId: 0,
    //userName: botName,
    //body: "welcome to chatcord!",
    //time: new Date().toLocaleTimeString(),
    //userPhoto: botPhoto,
    //});

    //socket.broadcast.emit("message", {
    //userId: 0,
    //friendId: 1,
    //groupId: 0,
    //userName: botName,
    //body: "a user has joined the chat",
    //time: new Date().toLocaleTimeString(),
    //userPhoto: botPhoto,
    //});

    //socket.on("disconnect", () => {
    //io.emit("message", {
    //userId: 0,
    //friendId: 1,
    //groupId: 0,
    //userName: botName,
    //body: "a user has left the chat",
    //time: new Date().toLocaleTimeString(),
    //userPhoto: botPhoto,
    //});
    //});

    socket.on("chatMessage", (msg) => {
      io.to(msg.to).emit("message", msg);
    });

    socket.on("join", (room) => {
      socket.join(room);
    });
  });

  await sequelize.sync();

  server.listen(3001, async () => {
    console.log("listening on port 3001");
  });
};

start();
