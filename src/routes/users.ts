import express from "express";
import { UsersController } from "../controllers";
import { catchAsyncHandler } from "../helpers";
import { requireLibrarian, validateReqBodyMiddleware } from "../middlewares";
import { editUserSchema, newUserSchema } from "../validations";

const usersRoutes = express.Router();
usersRoutes
  .route("/")
  .get(requireLibrarian, catchAsyncHandler(UsersController.getUsers))
  .post(
    requireLibrarian,
    validateReqBodyMiddleware(newUserSchema),
    catchAsyncHandler(UsersController.createUser)
  );

usersRoutes
  .route("/:id")
  .get(requireLibrarian, catchAsyncHandler(UsersController.getUser))
  .put(
    requireLibrarian,
    validateReqBodyMiddleware(editUserSchema),
    catchAsyncHandler(UsersController.updateUser)
  )
  .delete(requireLibrarian, catchAsyncHandler(UsersController.deleteUser));

export default usersRoutes;
