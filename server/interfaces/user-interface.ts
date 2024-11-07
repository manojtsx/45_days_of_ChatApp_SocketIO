import { Document, Types } from "mongoose";

// you need to do this if you are adding methods
export interface IUser extends Document{
    _id : Types.ObjectId;
    email : string;
    password : string;
    name : string;
    pic : string;
    isAdmin : boolean;
    matchPassword(enteredPassword : string) : Promise<boolean>
  }