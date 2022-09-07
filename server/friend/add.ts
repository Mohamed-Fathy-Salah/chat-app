import { Response, Request, Router } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import { requireAuth } from "../../middlewares/require-auth";

const router = Router();

router.post(
  "/api/friend",
  requireAuth,
  body("friendId").notEmpty(),
  validateRequest,
  async (req: Request, res: Response) => {
    // make sure friendId exists
    // add userId, friendId to friend db
    // if friendId, userId not in friend db emit message to friendid that they got friend request
    res.sendStatus(201);
  }
);

export { router as addFriendRouter };
