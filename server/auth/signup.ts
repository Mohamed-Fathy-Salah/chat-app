import { Response, Request, Router } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest } from "../../middlewares/validate-request";
import { User } from "../models/user";
import { BadRequestError } from "../../errors/bad-request-error";
import {Password} from './services/password';

const router = Router();

router.post(
  "/api/auth/signup",
  [
    body("name").trim().isLength({ min: 1, max: 20 }),
    body("email").isEmail(),
    body("password").trim().isLength({ min: 5, max: 15 }),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    // make sure email is not used
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestError("email is used");
    }

    // encrypt password
    const hashed = await Password.toHash(password);

    // save to db
    const user = await User.create({
      name: name,
      email: email,
      password: hashed,
    });

    // make session cookie
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    // send status code created
    res.status(201).send(user);
  }
);

export { router as signupRouter };
