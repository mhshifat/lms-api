import { model, Schema } from "mongoose";
import { BookModelType } from "../types/book";

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    numOfCopies: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    availableCopies: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default model<BookModelType>("Book", schema);
