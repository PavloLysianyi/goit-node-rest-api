import jwt from "jsonwebtoken";

import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import {
  createUser,
  findUser,
  updateUser,
  validatePassword,
} from "../services/usersServices.js";

const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { email } = req.body;
  const user = await findUser({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const newUser = await createUser(req.body);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUser({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const comparePassword = await validatePassword(password, user.password);

  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await updateUser(user._id, { token });

  res.json({
    token: token,
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await updateUser(_id, { token: "" });

  res.status(204).json();
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;

  const updatedUser = await updateUser({ _id }, req.body);

  res.json({
    email: updatedUser.email,
    subscription: updatedUser.subscription,
  });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
};
