import express, { Request, Response } from "express";
import chatControllers from "./chat-controller";
import protect from "../middleware/auth-middleware";
const router = express.Router();

router.route('/').post(protect, chatControllers.accessChat);
router.route('/').get(protect,chatControllers.fetchChats)
router.route('/group').post(protect, chatControllers.createGroupChat);
router.route('/rename').put(protect, chatControllers.renameGroup);
router.route('/groupremove').put(protect, chatControllers.removeFromGroup);
router.route('/groupadd').put(protect, chatControllers.addToGroup);

export { router };
