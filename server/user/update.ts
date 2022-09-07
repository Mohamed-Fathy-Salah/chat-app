import { Response, Request, Router } from "express";
import { body } from "express-validator";
import {validateRequest} from "../../middlewares/validate-request";
import {requireAuth} from "../../middlewares/require-auth";
import {upload} from "../../middlewares/storage";

const router = Router();

router.put(
  "/api/user/update",
  requireAuth,
  upload.single('photo'),
  [
      body("name").notEmpty(),
      body("status").notEmpty(),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
      // make sure user exists
      // update user data
      // if photo is supplied update it also
      // emit user data updated
    res.sendStatus(200);
  }
);

export { router as updateUserRouter };
