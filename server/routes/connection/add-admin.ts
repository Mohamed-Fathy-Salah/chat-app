import { Response, Request, Router } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import { requireAuth } from "../../middlewares/require-auth";
import { Connection } from "../../models/connection";
import { NotFoundError } from "../../errors/not-found-error";
import { io } from "../../socketWrapper";
import { EventNames } from "../../../events/event-names";

const router = Router();

router.post(
  "/api/connection/admin",
  requireAuth,
  [
      body("userId").notEmpty(),
      body("groupId").notEmpty(),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const groupId = req.body.groupId;
    const currentUserId = req.currentUser!.id;

    // make sure current user is admin
    await Connection.isAdmin(currentUserId, groupId);

    // make sure connection exists
    const adminId = req.body.userId;
    const connection = await Connection.findOne({where: {userId: adminId, groupId}});

    if(!connection) {
        throw new NotFoundError();
    }

    // update connection with admin = true
    connection.set({ admin: true });

    await connection.save();

    // emit admin created
    io.emit(EventNames.ADMIN_CREATED, {adminId, groupId});

    res.sendStatus(200);
  }
);

export { router as addAdminConnectionRouter };
