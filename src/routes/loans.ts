import express from "express";
import { LoansController } from "../controllers";
import { catchAsyncHandler } from "../helpers";
import { requireLibrarian, validateReqBodyMiddleware } from "../middlewares";
import { editLoanSchema, newLoanSchema } from "../validations";

const loansRoutes = express.Router();
loansRoutes
  .route("/")
  .get(catchAsyncHandler(LoansController.getLoans))
  .post(
    requireLibrarian,
    validateReqBodyMiddleware(newLoanSchema),
    catchAsyncHandler(LoansController.createLoan)
  );

loansRoutes
  .route("/:id")
  .get(catchAsyncHandler(LoansController.getLoan))
  .put(
    requireLibrarian,
    validateReqBodyMiddleware(editLoanSchema),
    catchAsyncHandler(LoansController.updateLoan)
  )
  .delete(requireLibrarian, catchAsyncHandler(LoansController.deleteLoan));

export default loansRoutes;
