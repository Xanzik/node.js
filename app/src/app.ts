import express, {type Express} from "express";
import type {Server} from "http";
import { LoggerService } from "./logger/logger.service.js";
import {UsersController} from "./users/users.controller.js";
import type {ExceptionFilter} from "./errors/exception.filter.js";

export class App {
    app: Express;
    server: Server;
    port: number;
    logger: LoggerService;
    usersController: UsersController;
    exceptionFilter: ExceptionFilter;

    constructor(logger: LoggerService, usersController: UsersController, exceptionFilter: ExceptionFilter) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.usersController = usersController;
        this.exceptionFilter = exceptionFilter;
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