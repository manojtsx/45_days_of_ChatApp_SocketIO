import express, { Request, Response } from 'express';
const app = express();
import cors from 'cors';
import {router as ChatRoute} from "../chat/chat-route"
import {router as UserRoute} from "../user/user-route";
import { config } from "../lib/lib"
import { corsOptions } from '../lib/lib';
import connectToDatabase from '../lib/db';
import { errorHandler, notFound } from '../middleware/error-middleware';

app.use(cors(corsOptions));
app.get("/", (req: Request, res: Response) => {
    res.send("API is running.");
});


// Route handler for all the entities
app.use(express.json());
app.use('/api/chat',ChatRoute);
app.use('/api/user',UserRoute);

// error handling middlewares
app.use(notFound);
app.use(errorHandler);

connectToDatabase();
app.listen(config.port, () => console.log(`Server started on port ${config.port}`));