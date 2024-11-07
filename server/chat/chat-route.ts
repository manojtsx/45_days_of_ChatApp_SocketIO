import express, { Request, Response } from "express";
import chatControllers from "./chat-controller";
const router = express.Router();

router.get("/", chatControllers.getAllChatsDetails);
router.get("/:id", chatControllers.getChatDetailById);

export { router };
