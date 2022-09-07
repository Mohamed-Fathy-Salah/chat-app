import { Response, Request, Router } from "express";
import { requireAuth } from "../../middlewares/require-auth";

const router = Router();

router.delete(
  "/api/group/:groupId/admin/:adminId",
  requireAuth,
  async (req: Request, res: Response) => {
      // make sure current user is admin
      // make sure adminId, groupid is in connection db
      // save admin with isAdmin=0
      // emit admin removed
    res.sendStatus(201);
  }
);

export { router as deleteAdminRouter };
