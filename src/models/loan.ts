import { model, Schema } from "mongoose";
import { LoanModelType } from "../types/loan";

const schema = new Schema(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    issueDate: {
      type: String,
      required: true,
    },
    dueDate: {
      type: String,
      required: true,
    },
    returnDate: {
      type: String,
    },
    status: {
      type: String,
      enum: ["In Progress", "Overdue", "Closed"],
    },
  },
  { timestamps: true }
);

export default model<LoanModelType>("Loan", schema);
