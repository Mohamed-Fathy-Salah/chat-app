import { Response, Request, Router } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import { requireAuth } from "../../middlewares/require-auth";
import { upload } from "../../middlewares/storage";
import { User } from "../../models/user";
import { NotFoundError } from "../../errors/not-found-error";

const router = Router();

router.put(
  "/api/user",
  requireAuth,
  upload.single("photo"),
  [body("name").custom((val) => {
      console.log(val)
      return val;
  }), body("status").notEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, status } = req.body;
    const photo = req.file;
    const userId = req.currentUser!.id;

    // get user
    const user = await User.findByPk(userId);

    // make sure user exists
    if (!user) {
      throw new NotFoundError();
    }

    // update user data
    user.set({ name, status });

    // if photo is supplied update it also
    if (photo) {
      user.set({ photo: photo.filename });
    }

    await user.save();

    // todo: emit user data updated

    res.sendStatus(204);
  }
);

export { router as updateUserRouter };
