import { Document, Types } from "mongoose";
import { Request } from "express";

// you need to do this if you are adding methods
export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  name: string;
  pic: string;
  isAdmin: boolean;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

export interface CustomRequest extends Request {
  user?: any;
}
