import { createServer } from "http";
import { sequelize } from "./models/sequelize-wrapper";
import { app } from "./app";
import { run } from "./socketWrapper";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  const server = createServer(app);

  run(server);

  await sequelize.sync();

  server.listen(3000, async () => {
    console.log("listening on port 3000");
  });
};

start();
