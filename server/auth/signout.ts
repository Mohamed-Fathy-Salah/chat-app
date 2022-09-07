import { Response, Request, Router } from "express";

const router = Router();

router.post(
  "/api/auth/signout",
  async (req: Request, res: Response) => {
      req.session = null;
      res.sendStatus(200);
  }
);

export {router as signoutRouter}
