import { Request, Response } from "express";
import { responseHandler } from "../helpers";
import { UserServices } from "../services";
import { NewUserInput, UserDocument, UserRoleEnum } from "../types/user";

export const getUsers = async (req: Request, res: Response) => {
  const users = await UserServices.getUsers({
    owner: (req.authInfo as any)?._id,
  });
  return responseHandler(res, 200, {
    users,
  });
};

export const createUser = async (req: Request, res: Response) => {
  const { email } = req.body as NewUserInput;
  await UserServices.isUserFound({
    res,
    query: { email },
  });
  const password = email.trim().split("@")?.[0];

  const createdUser = await UserServices.createUser({
    user: {
      ...req.body,
      owner: (req?.authInfo as UserDocument)?.id,
      password,
      role: req.body.role.length
        ? req.body.role === "1"
          ? UserRoleEnum.Member
          : UserRoleEnum.Librarian
        : UserRoleEnum.Member,
    },
  });
  return responseHandler(res, 200, {
    createdUser,
  });
};

export const getUser = async (req: Request, res: Response) => {
  const user = await UserServices.getUser({
    _id: req.params.id,
  });
  return responseHandler(res, 200, {
    user,
  });
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await UserServices.getUser({
    _id: req.params.id,
  });

  user?.set({
    ...req.body,
    role: req.body.role.length
      ? req.body.role === "1"
        ? UserRoleEnum.Member
        : UserRoleEnum.Librarian
      : UserRoleEnum.Member,
  });
  await user?.save();

  return responseHandler(res, 200, {
    updatedUser: user,
  });
};

export const deleteUser = async (req: Request, res: Response) => {
  const user = await UserServices.getUser({
    _id: req.params.id,
  });
  await user?.delete();

  return responseHandler(res, 200, {
    deleteUser: user,
  });
};
