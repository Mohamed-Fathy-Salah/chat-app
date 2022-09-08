import { Response, Request, Router } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import { requireAuth } from "../../middlewares/require-auth";
import { upload } from "../../middlewares/storage";
import { Group } from "../models/group";
import { Connection } from "../models/connection";
import { NotAuthorizedError } from "../../errors/not-authorized-error";
import { NotFoundError } from "../../errors/not-found-error";

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
    const isAdmin = await Connection.isAdmin(userId, groupId);
    if (!isAdmin) {
      throw new NotAuthorizedError();
    }

    // make sure groupId is present
    const group = await Group.findByPk(groupId);
    if (!group) {
      throw new NotFoundError();
    }

    const {name, description} = req.body;

    // update name, desc
    group.set({ name, description });

    // update photo if sent new one
    const photo = req.file;
    if (photo) {
      group.set({photo: photo.filename});
    }

    // save to group db
    await group.save();

    // todo: emit group data updated
    
    res.sendStatus(200);
  }
);

export { router as updateGroupRouter };
