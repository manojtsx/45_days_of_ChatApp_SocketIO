import express from "express";
import AuthController from "../auth/auth-controller";
import UserController from "./user-controller";
import protect from "../middleware/auth-middleware";
const router = express.Router();

router.route("/").get(protect,UserController.getAllUsers);
router.route("/login").post(AuthController.login);
router.route("/register").post(UserController.register);

export { router };
