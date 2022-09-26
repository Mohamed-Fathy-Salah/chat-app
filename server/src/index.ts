import { createServer } from "http";
import { sequelize } from "./models/sequelize-wrapper";
import { app } from "./app";
import { Server, Socket } from "socket.io";
import { Connection } from "./models/connection";
import { createClient } from "redis";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.REDIS_URL) {
    throw new Error("REDIS_HOST must be defined");
  }
  if (!process.env.POSTGRES_URL) {
    throw new Error("POSTGRES_URL must be defined");
  }

  const PORT = "3000";

  const subscriber = createClient({ url: process.env.REDIS_URL });

  const publisher = createClient({ url: process.env.REDIS_URL });

  subscriber.on("message", async function (channel, msg) {
    try {
      console.log(`received msg in channel ${channel} msg: ${msg}`);
      if (msg.isGroup) {
        const groupId = msg.to;
        const users = await Connection.findAll({
          where: { groupId },
          attributes: { exclude: ["groupId"] },
        });

        users.forEach((user) => {
          if (user.userId !== msg.from) {
            console.log(user.userId.toString());
            //@ts-ignore
            io.to(user.userId).emit("message", msg);
          }
        });
      } else {
        io.to(msg.to).emit("message", msg);
      }
    } catch (e) {
      console.error("--->", e);
    }
  });

  await sequelize.sync();

  const server = createServer(app);

  const io = new Server(server, {});

  io.on("connection", (socket: Socket) => {
    socket.on("chatMessage", (msg) => {
      publisher.publish("message", msg);
    });

    socket.on("join", (room) => {
      socket.join(room);
    });
  });

  server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
};

start();
