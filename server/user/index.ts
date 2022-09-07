import { Response, Request, Router } from "express";

const router = Router();

router.get(
  "/api/user/show/:userId",
  async (req: Request, res: Response) => {
    // make sure user exists without password or salt
    //res.status(200).send(user);
  }
);

export { router as indexUserRouter };
