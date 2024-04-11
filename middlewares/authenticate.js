import HttpError from "../helpers/HttpError.js";
import { findUser } from "../services/usersServices.js";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export const authenticate = async (req, _, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(HttpError(401, "Not authorized"));
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return next(HttpError(401, "Not authorized"));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await findUser({ _id: id });

    if (!user) {
      return next(HttpError(401, "User not found"));
    }

    if (!user.token) {
      return next(HttpError(401, "User already signout"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, error.message));
  }
};
