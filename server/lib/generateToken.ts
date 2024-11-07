import jwt from "jsonwebtoken";
import { config } from "./lib";
import { Types } from "mongoose";

export default function generateToken(userId: Types.ObjectId) {
  if (!config.key) {
    throw new Error("Secret key is not defined");
  }
  return jwt.sign({ userId }, config.key, {
    expiresIn: "30d",
  });
}
