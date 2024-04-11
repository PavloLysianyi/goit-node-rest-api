import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";

import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidid.js";

import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAllContact);

contactsRouter.get("/:id", isValidId, contactsControllers.getOneContact);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  contactsControllers.createContact
);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(updateContactSchema),
  contactsControllers.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  contactsControllers.updateFavorite
);

contactsRouter.delete("/:id", isValidId, contactsControllers.deleteContact);

export default contactsRouter;
