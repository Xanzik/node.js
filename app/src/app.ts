import express, {type Express} from "express";
import type {Server} from "http";
import { userRouter } from "./users/users.js";

export class App {
    app: Express;
    server: Server;
    port: number;

    constructor() {
        this.app = express();
        this.port = 8000;
    }

    useRoutes() {
        this.app.use('/users', userRouter);
    }

    public async init() {
        this.useRoutes();
        this.server = this.app.listen(this.port);
        console.log(`Server listening on http://localhost:${this.port}`);
    }
}