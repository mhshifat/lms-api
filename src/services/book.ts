import { Response } from "express";
import { BookModel } from "../models";
import { BookDocument } from "../types/book";

export const isBookFound = async ({
  query,
  res,
  message,
}: {
  query: Object;
  res: Response;
  message?: string;
}) => {
  const book = await BookModel.findOne(query);
  if (book) {
    res.statusCode = 409;
    throw new Error("Book already exist");
  }
  return book;
};

export const createBook = async ({ book }: { book: BookDocument }) => {
  return await BookModel.create(book);
};

export const getBooks = async (query: object) => {
  return await BookModel.find(query).select("-__v");
};

export const getBook = async (query: object) => {
  return await BookModel.findOne(query).select("-__v");
};

export const updateBook = async (findBy: object, book: object) => {
  const foundedBook = await BookModel.findOne(findBy).select("-__v");
  foundedBook?.set(book);
  await foundedBook?.save();
  return foundedBook;
};
