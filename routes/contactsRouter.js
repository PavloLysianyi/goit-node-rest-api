import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";

import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidid.js";
import { authenticate } from "../middlewares/authenticate.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";

export const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, contactsControllers.getAllContact);

contactsRouter.get(
  "/:id",
  authenticate,
  isValidId,
  contactsControllers.getOneContact
);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(createContactSchema),
  contactsControllers.createContact
);

contactsRouter.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(updateContactSchema),
  contactsControllers.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  contactsControllers.updateFavorite
);

contactsRouter.delete(
  "/:id",
  authenticate,
  isValidId,
  contactsControllers.deleteContact
);
