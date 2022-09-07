import { Response, Request, Router } from "express";

const router = Router();

router.get(
  "/api/auth/currentuser",
  async (req: Request, res: Response) => {
      res.status(200).send({currentUser: req.currentUser || null})
  }
);

export {router as currentUserRouter};
