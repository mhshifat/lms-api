import { model, Schema } from "mongoose";
import { UserModelType, UserRoleEnum } from "../types/user";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    mobileNumber: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    rememberMe: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: [UserRoleEnum.Librarian, UserRoleEnum.Member],
      default: UserRoleEnum.Member,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default model<UserModelType>("User", userSchema);
