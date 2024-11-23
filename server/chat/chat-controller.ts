import { Response } from "express";
import asyncHandler from "express-async-handler";
import Chat from "./chat-model";
import { CustomRequest } from "../interfaces/user-interface";
import User from "../user/user-model";
import Message from "../message/message-model";

class ChatController {
  public accessChat = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const { userId } = req.body;
      if (!userId) {
        res.sendStatus(400);
        return;
      }

      let isChat: any = await Chat.find({
        isGroupChat: false,
        $and: [
          { users: { $elemMatch: { $eq: req.user._id } } },
          { users: { $elemMatch: { $eq: userId } } },
        ],
      })
        .populate("users", "-password")
        .populate("latestMessage");

      isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
      });

      if (isChat.length > 0) {
        res.send(isChat[0]);
      } else {
        var chatData = {
          chatName: "sender",
          isGroupChat: false,
          users: [req.user._id, userId],
        };
        try {
          const createdChat = await Chat.create(chatData);

          const FullChat = await Chat.findOne({
            _id: createdChat._id,
          }).populate("users", "-password");

          res.status(200).send(FullChat);
        } catch (err: any) {
          res.status(400);
          throw new Error(err.message);
        }
      }
    }
  );

  public fetchChats = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
          .populate("users", "-pasword")
          .populate("groupAdmin", "-password")
          .populate("latestMessage")
          .sort({ updatedAt: -1 })
          .then(async (results: any) => {
            results = await User.populate(results, {
              path: "latestMessage.sender",
              select: "name pic email",
            });
            res.status(200).send(results);
          });
      } catch (err: any) {
        res.status(400);
        throw new Error(err.message);
      }
    }
  );

  public createGroupChat = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      if (!req.body.users || !req.body.name) {
        res.status(400).send({ Message: "Please Fill all the fields" });
        return;
      }
      
      let users = JSON.parse(req.body.users);
      console.log(users);
      if (users.length < 2) {
        res
          .status(400)
          .send("More than 2 users are required to form a group chat");
      }
      req.user.isAdmin = true;
      users.push(req.user);
      try {
        const groupChat = await Chat.create({
          chatName: req.body.name,
          users: users,
          isGroupChat: true,
          groupAdmin: req.user,
        });
        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
          .populate("users", "-password")
          .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);
        return;
      } catch (err: any) {
        res.status(400);
        throw new Error(err.message);
      }
    }
  );

  public renameGroup = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const { chatId, chatName } = req.body;
      const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
          chatName,
        },
        {
          new: true,
        }
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

      if (!updatedChat) {
        res.status(404);
        throw new Error("Chat Not Found");
      } else {
        res.json(updatedChat);
      }
    }
  );

  public addToGroup = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const { chatId, userId } = req.body;

      const added = await Chat.findByIdAndUpdate(
        chatId,
        {
          $push: { users: userId },
        },
        {
          new: true,
        }
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

      if (!added) {
        res.status(404);
        throw new Error("Chat Not Found");
      } else {
        res.json(added);
      }
    }
  );

  public removeFromGroup = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const { chatId, userId } = req.body;

      const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
          $pull: { users: userId },
        },
        {
          new: true,
        }
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

      if (!removed) {
        res.status(404);
        throw new Error("Chat Not Found");
      } else {
        res.json(removed);
      }
    }
  );
}

export default new ChatController();
