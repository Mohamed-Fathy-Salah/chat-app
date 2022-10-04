import { Response, Request, Router } from "express";
import { requireAuth } from "../../middlewares/require-auth";
import { Connection } from "../../models/connection";
import { Group } from "../../models/group";

const router = Router();

router.get("/api/group", requireAuth, async (req: Request, res: Response) => {
  const userId = req.currentUser!.id;
  const groups = await Connection.findAll({
    where: { userId },
    include: [Group],
    attributes: { exclude: ["userId", "groupId"] },
  });

  res.status(200).send(groups);
});

export { router as showGroupsRouter };
