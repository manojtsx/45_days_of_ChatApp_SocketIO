import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../user/user-model";
import generateToken from "../lib/generateToken";

class AuthController {
  public login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });
}

export default new AuthController();
