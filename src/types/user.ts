import { Document } from "mongoose";

export enum UserRoleEnum {
  Librarian = 0,
  Member = 1,
}

export interface UserDocument {
  id: string;
  email: string;
  password: string;
  rememberMe: boolean;
  role: UserRoleEnum;
  owner: UserDocument["id"];
}

export interface NewUserInput {
  email: string;
  firstName: string;
  lastName: boolean;
  mobileNumber: boolean;
  role: string;
  avatar: string;
}

export type UserModelType = UserDocument & Document;
