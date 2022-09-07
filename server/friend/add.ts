import { Response, Request, Router } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import { requireAuth } from "../../middlewares/require-auth";
import { NotFoundError } from "../../errors/not-found-error";
import {User} from '../models/user';
import {Friend} from '../models/friend';

const router = Router();

router.post(
  "/api/friend",
  requireAuth,
  body("friendId").notEmpty(),
  validateRequest,
  async (req: Request, res: Response) => {
      const {friendId} = req.body;
    // make sure friendId exists
    const existingFriend = await User.findByPk(friendId);

    if(!existingFriend) {
        throw new NotFoundError();
    }

     //add userId, friendId to friend db
    const userId = req.currentUser!.id;
    const [friendship, created] = await Friend.findOrCreate({where: {userId, friendId}});

     //if friendId, userId not in friend db emit message to friendid that they got friend request
    if(created) {
        // todo: emit msg
        return res.status(201).send(friendship);
    }

    res.sendStatus(200);
  }
);

export { router as addFriendRouter };
