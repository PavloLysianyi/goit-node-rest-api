import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import {
  addContact,
  getContactById,
  getContacts,
  removeContact,
  updateContactById,
} from "../services/contactsServices.js";

const getAllContacts = async (req, res) => {
  const result = await getContacts();
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await getContactById(id);

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const createContact = async (req, res) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await updateContactById(id, req.body);

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await updateContactById(id, req.body);

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id);

  if (!result) {
    throw HttpError(404);
  }

  res.status(204).json();
};

export default {
  getAllContact: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteContact: ctrlWrapper(deleteContact),
};
