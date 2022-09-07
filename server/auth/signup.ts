import { Response, Request, Router } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";

const router = Router();

router.post(
  "/api/auth/signup",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").trim().isLength({ min: 5, max: 15 }),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
      // make sure email is not used
      // encrypt password, add salt
      // put default value for photo, status
      // save to db
      // make session cookie
      res.sendStatus(201);
  }
);

export {router as signupRouter};
