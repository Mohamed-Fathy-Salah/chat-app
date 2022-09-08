import { Response, Request, Router } from "express";
import { requireAuth } from "../../middlewares/require-auth";
import { Connection } from "../models/connection";

const router = Router();

router.post(
  "/api/connection/:groupId/user/:userId",
  requireAuth,
  async (req: Request, res: Response) => {
    const groupId = req.params.groupId;
    const userId = req.currentUser!.id;

    // make sure current user is admin
    await Connection.isAdmin(userId, groupId);

    // make new user if not exists
    const newUserId = req.params.userId;
    const [connection, created] = await Connection.findOrCreate({
      where: { userId: newUserId, groupId },
    });

    // if user is not in group
    if (created) {
      // todo: emit user joined group
    }

    res.sendStatus(201);
  }
);

export { router as addUserConnectionRouter };
