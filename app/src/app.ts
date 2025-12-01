import express, {type Express} from "express";
import type {Server} from "http";
import {injectable, inject} from "inversify";
import {TYPES} from "./types.js";
import type {ILogger} from "./logger/logger.interface.js";
import type {IExceptionFilter} from "./errors/exception.filter.interface.js";
import type {IUserController} from "./users/userController.interface.js";

@injectable()
export class App {
    app: Express;
    server: Server;
    port: number;

    constructor(
        @inject(TYPES.ILogger) private logger: ILogger,
        @inject(TYPES.IUsersController) private usersController: IUserController,
        @inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter,
    ) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
    }

    useRoutes(): void {
        this.app.use('/users', this.usersController.router);
    }

    useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    public async init() {
        this.useRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port);
        this.logger.log(`Server listening on http://localhost:${this.port}`);
    }
}