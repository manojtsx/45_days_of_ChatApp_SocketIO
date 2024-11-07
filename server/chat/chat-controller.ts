import { Request, Response } from 'express';
import { chats } from '../data/data';

class ChatController {
    public getAllChatsDetails(req: Request, res: Response): void {
        res.send(chats);
    }

    public getChatDetailById(req: Request, res: Response): void {
        const id: string = req.params.id;
        const singleChat = chats.find(chat => chat._id === id);
        res.send(singleChat);
    }
}

export default new ChatController();