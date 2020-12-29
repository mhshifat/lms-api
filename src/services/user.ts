import bcrypt from "bcryptjs";
import { Response } from "express";
import { UserModel } from "../models";
import { UserDocument } from "../types/user";

export const isUserExist = async ({
  query,
  res,
  message,
}: {
  query: Object;
  res: Response;
  message?: string;
}) => {
  const user = await UserModel.findOne(query);
  if (!user) {
    res.statusCode = message ? 400 : 404;
    throw new Error(message || "User not found");
  }
  return user;
};

export const isUserFound = async ({
  query,
  res,
  message,
}: {
  query: Object;
  res: Response;
  message?: string;
}) => {
  const user = await UserModel.findOne(query);
  if (user) {
    res.statusCode = 409;
    throw new Error("User already exist");
  }
  return user;
};

export const createUser = async ({ user }: { user: UserDocument }) => {
  user.password = await bcrypt.hash(user.password, 10);
  return await UserModel.create(user);
};

export const getUsers = async (query: object) => {
  return await UserModel.find(query).select("-password");
};

export const getUser = async (query: object) => {
  return await UserModel.findOne(query).select("-password");
};
