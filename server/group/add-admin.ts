import { Response, Request, Router } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import { requireAuth } from "../../middlewares/require-auth";

const router = Router();

router.post(
  "/api/group/:groupId",
  requireAuth,
  body("userId").notEmpty(),
  validateRequest,
  async (req: Request, res: Response) => {
      // make sure current user is admin
      // make sure userid, groupid is in connection db
      // save new user with isAdmin=1
      // emit admin created
    res.sendStatus(201);
  }
);

export { router as addAdminRouter };
