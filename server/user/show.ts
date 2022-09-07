import { Response, Request, Router } from "express";

const router = Router();

router.get(
  "/api/user/show",
  async (req: Request, res: Response) => {
    // get all users without password or salt
    //res.status(200).send(users);
  }
);

export { router as showUsersRouter };
