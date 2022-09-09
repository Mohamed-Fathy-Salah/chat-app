import { Response, Request, Router } from "express";
import { EventNames } from "../../../events/event-names";
import { NotFoundError } from "../../errors/not-found-error";
import { requireAuth } from "../../middlewares/require-auth";
import { Connection } from "../../models/connection";
import { io } from "../../socketWrapper";

const router = Router();
// todo: check if last admin in group then select random user and make admin

router.delete(
  "/api/connection/:groupId/admin/:adminId",
  requireAuth,
  async (req: Request, res: Response) => {
    const groupId = req.params.groupId;
    const userId = req.currentUser!.id;

    // make sure current user is admin
    await Connection.isAdmin(userId, groupId);

    // make sure adminId, groupId is in connection db
    const adminId = req.params.adminId;
    const connection = await Connection.findOne({
      where: { userId: adminId, groupId },
    });

    if (!connection) {
      throw new NotFoundError();
    }

    // if connection is admin
    if (connection.admin) {
      // save admin with isAdmin=false
      connection.set({ admin: false });

      await connection.save();

      // emit admin removed
      io.emit(EventNames.ADMIN_REMOVED, {adminId, groupId});
    }

    res.sendStatus(200);
  }
);

export { router as deleteAdminRouter };
