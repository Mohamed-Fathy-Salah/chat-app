import { Response, Request, Router } from "express";
import { EventNames } from "../../../events/event-names";
import { requireAuth } from "../../middlewares/require-auth";
import { Connection } from "../../models/connection";
import { Group } from "../../models/group";
import { io } from "../../socketWrapper";

const router = Router();

router.delete(
  "/api/group/:groupId",
  requireAuth,
  async (req: Request, res: Response) => {
      const groupId = req.params.groupId;
      const userId = req.currentUser!.id;

    // make sure user is admin from connection db
    await Connection.isAdmin(userId, groupId);

    // delete all from connection with groupId
    await Connection.destroy({where: {groupId}});

    // delete group from group db
    await Group.destroy({where: {id: groupId}});

    // emit group deleted
    io.emit(EventNames.GROUP_DELETED, {groupId});

    res.sendStatus(200);
  }
);

export { router as deleteGroupRouter };
