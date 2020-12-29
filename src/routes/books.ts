import express from "express";
import { BooksController } from "../controllers";
import { catchAsyncHandler } from "../helpers";
import { requireLibrarian, validateReqBodyMiddleware } from "../middlewares";
import { editBookSchema, newBookSchema } from "../validations/book";

const booksRoutes = express.Router();
booksRoutes
  .route("/")
  .get(catchAsyncHandler(BooksController.getBooks))
  .post(
    requireLibrarian,
    validateReqBodyMiddleware(newBookSchema),
    catchAsyncHandler(BooksController.createBook)
  );

booksRoutes
  .route("/:id")
  .get(catchAsyncHandler(BooksController.getBook))
  .put(
    requireLibrarian,
    validateReqBodyMiddleware(editBookSchema),
    catchAsyncHandler(BooksController.updateBook)
  )
  .delete(requireLibrarian, catchAsyncHandler(BooksController.deleteBook));

export default booksRoutes;
