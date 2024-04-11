import express from "express";
import usersControllers from "../controllers/usersControllers.js";

import { validateBody } from "../middlewares/validateBody.js";
import {
  updateSubscriptionSchema,
  userSigninSchema,
  userSignupSchema,
} from "../schemas/usersSchemas.js";
import { authenticate } from "../middlewares/authenticate.js";

export const usersRouter = express.Router();

usersRouter.post(
  "/register",
  validateBody(userSignupSchema),
  usersControllers.register
);

usersRouter.post(
  "/login",
  validateBody(userSigninSchema),
  usersControllers.login
);

usersRouter.get("/current", authenticate, usersControllers.getCurrent);

usersRouter.post("/logout", authenticate, usersControllers.logout);

usersRouter.patch(
  "/",
  authenticate,
  validateBody(updateSubscriptionSchema),
  usersControllers.updateSubscription
);
