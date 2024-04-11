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
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const filter = favorite ? { owner, favorite } : { owner };
  const skip = (page - 1) * limit;

  const result = await getContacts({ ...filter }, { skip, limit });

  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await getContactById({ _id: id, owner });

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await addContact({ ...req.body, owner });

  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await updateContactById({ _id: id, owner }, req.body);

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await updateContactById({ _id: id, owner }, req.body);

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await removeContact({ _id: id, owner });

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
