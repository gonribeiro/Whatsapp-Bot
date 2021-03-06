import express, { NextFunction, Request, Response } from "express";
import { routes } from './routes';
import "express-async-errors";
import './database';
import './bot';
import './services/BotService';

const app = express();

app.use(express.json());

app.use(routes);

app.use(
    (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof Error) {
        return response.status(400).json(error.message);
    }

        return response.status(500).json(error);
    }
);

export { app }
