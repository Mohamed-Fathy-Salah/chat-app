import { Response, Request, Router } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import { requireAuth } from "../../middlewares/require-auth";
import { upload } from "../../middlewares/storage";

const router = Router();

router.put(
  "/api/group/:groupId",
  requireAuth,
  upload.single("photo"),
  [body("name").notEmpty(), body("description").notEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    // make sure groupId is present
    // update photo if sent new one
    // save to group db
    // emit group data updated
    res.sendStatus(201);
  }
);

export { router as updateGroupRouter };
