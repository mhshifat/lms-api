import express from "express";
import { AuthController } from "../controllers";
import { catchAsyncHandler } from "../helpers";
import { validateReqBodyMiddleware } from "../middlewares";
import {
  loginInputSchema,
  registerInputSchema,
  tokenLoginInputSchema,
} from "../validations";

const authRoutes = express.Router();
authRoutes
  .route("/register")
  .post(
    validateReqBodyMiddleware(registerInputSchema),
    catchAsyncHandler(AuthController.register)
  );

authRoutes
  .route("/login")
  .post(
    validateReqBodyMiddleware(loginInputSchema),
    catchAsyncHandler(AuthController.login)
  );

authRoutes
  .route("/login/token")
  .post(
    validateReqBodyMiddleware(tokenLoginInputSchema),
    catchAsyncHandler(AuthController.tokenLogin)
  );

export default authRoutes;
