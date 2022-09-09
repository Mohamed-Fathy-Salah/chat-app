import { Response, Request, Router } from "express";
import { Connection } from "../../models/connection";
import { User } from "../../models/user";

const router = Router();

router.get(
  "/api/connection/:groupId",
  async (req: Request, res: Response) => {
    const groupId = req.params.groupId;

    // get from connection groupId and remove password from users
    const users = await Connection.findAll({
      where: { groupId },
      include: { model: User, attributes: { exclude: ["password"] } },
      attributes: {exclude: ['groupId', 'userId']}
    });

    res.status(200).send(users);
  }
);

export { router as getGroupUsersRouter };
