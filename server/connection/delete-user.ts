import { Response, Request, Router } from "express";
import { requireAuth } from "../../middlewares/require-auth";

const router = Router();

router.delete(
  "/api/group/:groupId/user/:userId",
  requireAuth,
  async (req: Request, res: Response) => {
      // make sure current user is admin
      // delete userId, groupId from connection db
      // emit user removed
    res.sendStatus(201);
  }
);

export { router as deleteUserRouter };
