import { Response, Request, Router } from "express";
import { requireAuth } from "../../middlewares/require-auth";

const router = Router();

router.post(
  "/api/group/:groupId",
  requireAuth,
  async (req: Request, res: Response) => {
    // make sure groupId exists
    // if user is not in group
    //      save userId, groupId, isAdmin=0 
    //      emit user joined group
  }
);

export { router as joinGroupRouter };
