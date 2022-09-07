import { Response, Request, Router } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";

const router = Router();

router.post(
  "/api/auth/signin",
  [
    body("email").isEmail(),
    body("password").trim().isLength({ min: 5, max: 15 }),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
      // make sure creds are correct
      // make session cookie
      res.sendStatus(200);
  }
);

export {router as signinRouter}
