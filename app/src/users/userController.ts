import {BaseController} from "../common/base.controller.js";
import type {NextFunction, Request, Response} from "express";
import {HTTPError} from "../errors/http-error.class.js";
import {inject, injectable} from "inversify";
import type {ILogger} from "../logger/logger.interface.js";
import {TYPES} from "../types.js";
import type {IUserController} from "./userController.interface.js";

@injectable()
export class UserController extends BaseController implements IUserController {
    constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
        super(loggerService);
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