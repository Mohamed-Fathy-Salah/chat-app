import { Response, Request, Router } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import { requireAuth } from "../../middlewares/require-auth";
import { upload } from "../../middlewares/storage";
import { Group } from "../../models/group";
import { Connection } from "../../models/connection";
import { NotFoundError } from "../../errors/not-found-error";
import { io } from "../../socketWrapper";
import { EventNames } from "../../../events/event-names";

const router = Router();

router.put(
  "/api/group/:groupId",
  requireAuth,
  upload.single("photo"),
  [body("name").notEmpty(), body("description").notEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const groupId = req.params.groupId;
    const userId = req.currentUser!.id;

    // make sure user is admin in group
    await Connection.isAdmin(userId, groupId);

    // make sure groupId is present
    const group = await Group.findByPk(groupId);
    if (!group) {
      throw new NotFoundError();
    }

    const { name, description } = req.body;

    // update name, desc
    group.set({ name, description });

    // update photo if sent new one
    const photo = req.file;
    if (photo) {
      group.set({ photo: photo.filename });
    }

    // save to group db
    await group.save();

    // emit group data updated
    io.emit(EventNames.GROUP_UPDATED, {
      groupId: group.id,
      name: group.name,
      description: group.description,
      photo: group.photo,
    });

    res.sendStatus(200);
  }
);

export { router as updateGroupRouter };
