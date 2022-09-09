import { Response, Request, Router } from "express";
import { NotFoundError } from "../../errors/not-found-error";
import { requireAuth } from "../../middlewares/require-auth";
import { Connection } from "../../models/connection";

const router = Router();

// todo: if user is current user then delete them from db no auth required
// todo: check if last user then delete group also from groupdb

router.delete(
  "/api/connection/:groupId/user/:userId",
  requireAuth,
  async (req: Request, res: Response) => {
    const groupId = req.params.groupId;
    const currentUserId = req.currentUser!.id;

    // make sure current user is admin
    await Connection.isAdmin(currentUserId, groupId);

    // make sure adminId, groupId is in connection db
    const userId = req.params.userId;
    const connection = await Connection.findOne({
      where: { userId, groupId },
    });

    if (!connection) {
      throw new NotFoundError();
    }

    // delete userId, groupId from connection db
    await connection.destroy();

    // todo: emit user removed
    res.sendStatus(200);
  }
);

export { router as deleteUserRouter };
