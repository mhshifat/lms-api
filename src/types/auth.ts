import { UserRoleEnum } from "./user";

export interface UserPayload {
  uid: string;
  email: string;
  rememberMe: boolean;
  role: UserRoleEnum;
  createdAt: string;
}

export interface RegisterInputs {
  email: string;
  password: string;
}

export interface LoginInputs {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface TokenLoginInputs {
  token: string;
}
