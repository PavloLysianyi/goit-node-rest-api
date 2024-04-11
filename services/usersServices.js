import bcrypt from "bcrypt";

import { User } from "../models/User.js";

export const findUser = (filter) => User.findOne(filter);

export const createUser = async (data) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(data.password, salt);

  const newUser = User.create({ ...data, password: hashPassword });
  return newUser;
};

export const updateUser = async (id, data) => User.findByIdAndUpdate(id, data);

export const validatePassword = (password, userPassword) =>
  bcrypt.compare(password, userPassword);
