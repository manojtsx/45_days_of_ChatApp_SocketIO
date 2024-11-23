import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../user/user-model";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import { config } from "../lib/lib";
import { CustomRequest } from "../interfaces/user-interface";

const protect = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        
        if (config.key) {
          const decoded = jwt.verify(token, config.key) as JwtPayload;
          req.user = await User.findById(decoded.userId).select("-password");
          next();
        } else {
          throw new Error("JWT key is not defined");
        }
      } catch (err: any) {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }
  }
);

export default protect;
