import { Response, Request, Router } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../../errors/bad-request-error";
import { User } from "../models/user";
import { Password } from "./services/password";

const router = Router();

router.post(
  "/api/auth/signin",
  [
    body("email").isEmail(),
    body("password").trim().isLength({ min: 5, max: 15 }),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // make sure creds are correct
    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      throw new BadRequestError("invalid credentials");
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      throw new BadRequestError("invalid credentials");
    }

    // make session jwt
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    // store it on session obj
    req.session = {
      jwt: userJwt,
    };

    res.sendStatus(200);
  }
);

export { router as signinRouter };
