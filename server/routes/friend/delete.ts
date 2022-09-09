import { Response, Request, Router } from "express";
import { EventNames } from "../../../events/event-names";
import { NotFoundError } from "../../errors/not-found-error";
import { requireAuth } from "../../middlewares/require-auth";
import { Friend } from "../../models/friend";
import { io } from "../../socketWrapper";

const router = Router();

router.delete(
  "/api/friend/:friendId",
  requireAuth,
  async (req: Request, res: Response) => {
      const userId = req.currentUser!.id;
      const friendId = req.params.friendId;

    // delete userId, friendId from friend db
    const friendship = await Friend.findOne({where: {userId, friendId}})
    if(!friendship) {
        throw new NotFoundError();
    }

    await friendship.destroy();

    // emit friend removed
    io.emit(EventNames.FRIEND_REMOVED, {userId, friendId});

    res.sendStatus(200);
  }
);

export { router as deleteFriendRouter };
