import { Contact } from "../models/Contact.js";

export const getContacts = async (filter = {}, query = {}) => {
  const contacts = await Contact.find(
    filter,
    "name email phone favorite",
    query
  ).populate("owner", "email");
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

export const addContact = async (data) => {
  const newContact = await Contact.create(data);
  return newContact;
};

export const updateContactById = async (contactId, data) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, data, {
    new: true,
  });
  return updatedContact;
};

export const removeContact = async (contactId) => {
  const deletedContact = await Contact.findByIdAndDelete(contactId);
  return deletedContact;
};
