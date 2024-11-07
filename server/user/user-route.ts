import express from "express";
import AuthController from "../auth/auth-controller";
import UserController from "./user-controller";
const router = express.Router();

router.route("/login").post(AuthController.login);
router.route("/register").post(UserController.register);

export { router };
