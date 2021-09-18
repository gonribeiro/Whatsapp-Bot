import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import { routes } from './routes';

import './database';

const app = express();

app.use(express.json());

app.use(routes);

require('./bot');

app.use(
    (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof Error) {
        return response.status(400).json(error.message);
    }

        return response.status(500).json(error);
    }
);

app.listen(3333, () => console.log('Server runnig on port 3333'));
