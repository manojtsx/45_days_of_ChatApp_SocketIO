import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "./user-model";
import generateToken from "../lib/generateToken";

class UserController {
  public register = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body);
    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please enter all fields");
    }
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    const user = await User.create({
      name,
      email,
      password,
      pic,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Failed to create the user");
    }
  });
}

export default new UserController();
