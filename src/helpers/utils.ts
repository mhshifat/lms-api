import { sign } from "jsonwebtoken";
import { UserPayload } from "../types/auth";
import { UserDocument } from "../types/user";

export const capFirstLetterInWord = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

export const capFirstLetterInSentence = (sentence: string) =>
  sentence
    .split(" ")
    .map((word) => capFirstLetterInWord(word))
    .join(" ");

export const generateUserPayload = (user: UserDocument): UserPayload => ({
  uid: user.id,
  email: user.email,
  role: user.role,
  rememberMe: user.rememberMe,
  createdAt: Date.now().toString(),
});

export const generateToken = ({
  payload,
  secret,
  expiresIn,
}: {
  payload: UserPayload;
  secret: string;
  expiresIn: string;
}): string => sign(payload, secret, { expiresIn });
