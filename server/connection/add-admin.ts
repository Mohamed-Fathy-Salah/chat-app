import { Response, Request, Router } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import { requireAuth } from "../../middlewares/require-auth";
import { Connection } from "../models/connection";
import { NotFoundError } from "../../errors/not-found-error";

const router = Router();

router.post(
  "/api/connection/:groupId/admin/:adminId",
  requireAuth,
  body("userId").notEmpty(),
  validateRequest,
  async (req: Request, res: Response) => {
    const groupId = req.params.groupId;
    const userId = req.currentUser!.id;

    // make sure current user is admin
    await Connection.isAdmin(userId, groupId);

    // make sure connection exists
    const adminId = req.params.adminId;
    const connection = await Connection.findOne({where: {userId: adminId, groupId}});

    if(!connection) {
        throw new NotFoundError();
    }

    // update connection with admin = true
    connection.set({ admin: true });

    await connection.save();

    // todo: emit admin created

    res.sendStatus(200);
  }
);

export { router as addAdminConnectionRouter };
