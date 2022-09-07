import { Response, Request, Router } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import { requireAuth } from "../../middlewares/require-auth";

const router = Router();

router.post(
  "/api/group",
  requireAuth,
  body("name").notEmpty(),
  validateRequest,
  async (req: Request, res: Response) => {
      // use default photo, description for group
      // save to group db
      // save userId, groupId, isAdmin=1 to connection db
      // emit group created
    res.sendStatus(201);
  }
);

export { router as createGroupRouter };
