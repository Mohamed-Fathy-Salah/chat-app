import "express-async-errors";
import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import cors from "cors";

import { currentUser } from "./middlewares/current-user";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { signupRouter } from "./routes/auth/signup";
import { signoutRouter } from "./routes/auth/signout";
import { currentUserRouter } from "./routes/auth/current-user";
import { signinRouter } from "./routes/auth/signin";
import { updateUserRouter } from "./routes/user/update";
import { indexUserRouter } from "./routes/user";
import { showUsersRouter } from "./routes/user/show";
import { deleteGroupRouter } from "./routes/group/delete";
import { updateGroupRouter } from "./routes/group/update";
import { createGroupRouter } from "./routes/group/create";
import { showGroupsRouter } from "./routes/group/show";
import { addFriendRouter } from "./routes/friend/add";
import { showFriendsRouter } from "./routes/friend/show-friends";
import { deleteFriendRouter } from "./routes/friend/delete";
import { addAdminConnectionRouter } from "./routes/connection/add-admin";
import { addUserConnectionRouter } from "./routes/connection/add-user";
import { deleteAdminRouter } from "./routes/connection/delete-admin";
import { deleteUserRouter } from "./routes/connection/delete-user";
import { getGroupUsersRouter } from "./routes/connection/get-all";

const app = express();

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
    httpOnly: false,
  })
);
app.use(
  cors({
    credentials: true,
    origin: true,
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
