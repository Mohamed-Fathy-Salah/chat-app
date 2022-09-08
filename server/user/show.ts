import { Response, Request, Router } from "express";
import { User } from "../models/user";

const router = Router();

router.get("/api/user", async (req: Request, res: Response) => {
  // get all users without password
  const users = await User.findAll({ attributes: { exclude: ["password"] } });

  res.status(200).send(users);
});

export { router as showUsersRouter };
