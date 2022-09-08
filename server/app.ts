import "express-async-errors";
import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { currentUser } from "../middlewares/current-user";
import { errorHandler } from "../middlewares/error-handler";
import { NotFoundError } from "../errors/not-found-error";

import { updateUserRouter } from "./user/update";
import { indexUserRouter } from "./user/index";
import { showUsersRouter } from "./user/show";
import { deleteGroupRouter } from "./group/delete";
import { updateGroupRouter } from "./group/update";
import { createGroupRouter } from "./group/create";
import { showGroupsRouter } from "./group/show";
import { addFriendRouter } from "./friend/add";
import { showFriendsRouter } from "./friend/show-friends";
import { deleteFriendRouter } from "./friend/delete";
import { signupRouter } from "./auth/signup";
import { signoutRouter } from "./auth/signout";
import { currentUserRouter } from "./auth/current-user";
import { signinRouter } from "./auth/signin";
import { addAdminConnectionRouter } from "./connection/add-admin";
import { addUserConnectionRouter } from "./connection/add-user";
import { deleteAdminRouter } from "./connection/delete-admin";
import { deleteUserRouter } from "./connection/delete-user";
import { getGroupUsersRouter } from "./connection/get-all";

const app = express();

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(currentUser);

app.use(signupRouter);
app.use(signoutRouter);
app.use(currentUserRouter);
app.use(signinRouter);

app.use(updateUserRouter);
app.use(indexUserRouter);
app.use(showUsersRouter);

app.use(deleteGroupRouter);
app.use(updateGroupRouter);
app.use(createGroupRouter);
app.use(showGroupsRouter);

app.use(addFriendRouter);
app.use(showFriendsRouter);
app.use(deleteFriendRouter);

app.use(addAdminConnectionRouter);
app.use(addUserConnectionRouter);
app.use(deleteAdminRouter);
app.use(deleteUserRouter);
app.use(getGroupUsersRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
