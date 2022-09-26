import { Response, Request, Router } from "express";
import { BadRequestError } from "../../errors/bad-request-error";
import { User } from "../../models/user";

const router = Router();

router.get("/api/user", async (req: Request, res: Response) => {
  // get all users without password
  const currentUser = req.query.currentUser || "0";
  if (currentUser === "0") {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    return res.status(200).send(users);
  }

  if (!req.currentUser) {
    throw new BadRequestError("not signed in ");
  }

  const user = await User.findOne({
    where: { id: req.currentUser.id },
    attributes: { exclude: ["password"] },
  });

  res.status(200).send(user);
});

export { router as showUsersRouter };
