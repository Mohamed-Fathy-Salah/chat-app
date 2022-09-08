import { Response, Request, Router } from "express";
import { requireAuth } from "../../middlewares/require-auth";
import { Friend } from "../models/friend";
import { User } from "../models/user";

const router = Router();

router.get("/api/friend", requireAuth, async (req: Request, res: Response) => {
  const userId = req.currentUser!.id;

  const friends = await Friend.findAll({ where: { userId }, include: [{model: User, attributes: ['id', 'name', 'status', 'email', 'photo']}]});

  res.status(200).send(friends);
});

export { router as showFriendsRouter };
