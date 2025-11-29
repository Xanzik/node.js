import {BaseController} from "../common/base.controller.js";
import {LoggerService} from "../logger/logger.service.js";
import type {NextFunction, Request, Response} from "express";
import {HTTPError} from "../errors/http-error.class.js";

export class UsersController extends BaseController {
    constructor(logger: LoggerService) {
        super(logger);
        this.bindRoutes([{
            path: '/login',
            method: 'post',
            func: this.login,
        }, {
            path: '/register',
            method: 'post',
            func: this.register,
        }]);
    }

    login(req: Request, res: Response, next: NextFunction) {
        next(new HTTPError(401, 'Authentication failed'));
    }

    register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'register');
    }
}