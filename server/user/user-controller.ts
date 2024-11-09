import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "./user-model";
import generateToken from "../lib/generateToken";
import { CustomRequest } from "../interfaces/user-interface";

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

  //  /api/user?search=mnaoj
  public getAllUsers = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const { search } = req.query;
      console.log(req.user);
      const query = search
        ? {
            $or: [
              { name: { $regex: search, $options: "i" } },
              { email: { $regex: search, $options: "i" } },
            ],
          }
        : {};
      const users = await User.find(query).find({ _id: { $ne: req.user._id } });
      res.send(users);
    }
  );
}

export default new UserController();
