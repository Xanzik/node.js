import {type Response, Router} from "express";
import type { IRoute } from "./route.interface.js";
import type {ILogger} from "../logger/logger.interface.js";
import {injectable} from "inversify";
import {inject} from "inversify";
import {TYPES} from "../types.js";

@injectable()
export abstract class BaseController {
    private readonly _router: Router;
    protected constructor(@inject(TYPES.ILogger) private logger: ILogger) {
        this._router = Router();
    }

    get router(): Router {
        return this._router;
    }

    public send<T>(res: Response, code: number, message: T) {
        res.type('application/json');
        res.status(code).json(message);
    }

    public ok<T>(res: Response, message: T) {
        this.send(res, 200, message);
    }

    public created(res: Response) {
        return res.sendStatus(201);
    }

    protected bindRoutes(routes: IRoute[]): void {
        for(const route of routes) {
            this.logger.log(`[${route.method}] ${route.path}`);
            const handler = route.func.bind(this);
            this._router[route.method](route.path, handler);
        }
    }
}