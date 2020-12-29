import { NextFunction, Request, Response } from "express";
import { AuthServices } from "../services";
import { UserDocument, UserRoleEnum } from "../types/user";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.get("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.statusCode = 401;
    throw new Error("Unauthorized, please log in");
  }
  const user = await AuthServices.validateAccessToken({ token, res });
  req.authInfo = user;

  next();
};

export const requireLibrarian = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (+(req?.authInfo as UserDocument)?.role !== UserRoleEnum.Librarian) {
    res.statusCode = 403;
    throw new Error("Forbidden, You don't have required permission");
  }
  next();
};
