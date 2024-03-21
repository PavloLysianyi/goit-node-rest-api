import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

export const getContactById = async (contactId) => {
  const contactsList = await listContacts();
  const result = contactsList.find((contact) => contact.id === contactId);
  return result || null;
};

export const addContact = async ({ name, email, phone }) => {
  const contactsList = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contactsList.push(newContact);
  await updateContacts(contactsList);
  return newContact;
};

export const removeContact = async (contactId) => {
  const contactsList = await listContacts();
  const index = contactsList.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const [result] = contactsList.splice(index, 1);
  await updateContacts(contactsList);
  return result;
};

export const updateContact = async (contactId, data) => {
  const contactsList = await listContacts();
  const index = contactsList.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  contactsList[index] = { ...data, contactId };
  await updateContacts(contactsList);
  return contactsList[index];
};
