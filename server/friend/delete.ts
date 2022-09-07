import { Response, Request, Router } from "express";
import { requireAuth } from "../../middlewares/require-auth";

const router = Router();

router.delete(
  "/api/friend/:friendId",
  requireAuth,
  async (req: Request, res: Response) => {
    // delete userId, friendId from friend db
    res.sendStatus(201);
  }
);

export { router as addFriendRouter };
