import { Response, Request, Router } from "express";
import { requireAuth } from "../../middlewares/require-auth";

const router = Router();

router.delete(
  "/api/group/:groupId",
  requireAuth,
  async (req: Request, res: Response) => {
    // make sure user is admin from connection db
    // delete all from connection with groupId
    // delete group from group db
    // emit group deleted
    res.sendStatus(201);
  }
);

export { router as deleteGroupRouter };
