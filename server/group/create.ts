import { Response, Request, Router } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import { requireAuth } from "../../middlewares/require-auth";
import { Group } from "../models/group";
import { Connection } from "../models/connection";

const router = Router();

router.post(
  "/api/group",
  requireAuth,
  body("name").notEmpty(),
  validateRequest,
  async (req: Request, res: Response) => {
      const userId = req.currentUser!.id;
      const {name} = req.body;
      
      // use default photo, description for group, save to group db
      const {id: groupId} = await Group.create({name});

      // save userId, groupId, isAdmin=1 to connection db
      await Connection.create({userId, groupId, admin: true})

      // todo: emit group created
      
    res.sendStatus(201);
  }
);

export { router as createGroupRouter };
