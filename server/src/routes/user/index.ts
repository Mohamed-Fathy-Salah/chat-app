import { Response, Request, Router } from "express";
import { NotFoundError } from "../../errors/not-found-error";
import { User } from "../../models/user";

const router = Router();

router.get("/api/user/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;

  // get user without password
  const user = await User.findOne({ where: { id: userId }, attributes: {exclude: ['password']} });

  // make sure user exists
  if(!user) {
      throw new NotFoundError();
  }

  res.status(200).send(user);
});

export { router as indexUserRouter };
