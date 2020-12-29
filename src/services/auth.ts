import bcrypt from "bcryptjs";
import { Response } from "express";
import { decode, verify } from "jsonwebtoken";
import { UserServices } from ".";
import { env } from "../config";
import { UserModel } from "../models";
import { UserPayload } from "../types/auth";
import { UserDocument } from "../types/user";

export const isPwdMatched = async ({
  password,
  hashPassword,
  res,
}: {
  password: string;
  hashPassword: string;
  res: Response;
}) => {
  const isPwdMatched = await bcrypt.compare(password, hashPassword);

  if (!isPwdMatched) {
    res.statusCode = 400;
    throw new Error("Wrong credentials");
  }
  return !!isPwdMatched;
};

export const isUserExist = async ({
  query,
  res,
}: {
  query: Object;
  res: Response;
}) => {
  const user = await UserModel.findOne(query);
  if (user) {
    res.statusCode = 409;
    throw new Error("Please use a different email address");
  }
  return null;
};

export const validateAccessToken = async ({
  token,
  res,
}: {
  token: string;
  res: Response;
}): Promise<UserDocument> => {
  try {
    const decodedToken = decode(token) as UserPayload;
    const user = await UserServices.isUserExist({
      res,
      query: { _id: decodedToken.uid },
      message: "Invalid token",
    });
    verify(token, env.jwt.secret + user.password) as UserPayload;
    return user;
  } catch (err) {
    res.statusCode = 400;
    throw new Error("Invalid token");
  }
};
