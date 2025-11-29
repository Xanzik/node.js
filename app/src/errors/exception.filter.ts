import type { Request, Response, NextFunction } from "express";
import type {LoggerService} from "../logger/logger.service.js";
import type {IExceptionFilter} from "./exception.filter.interface.js";
import {HTTPError} from "./http-error.class.js";

export class ExceptionFilter implements IExceptionFilter {
    logger: LoggerService;
    constructor(logger: LoggerService) {
        this.logger = logger;
    }
    catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
        if(err instanceof HTTPError) {
            this.logger.error(`[${err.context}] Error ${err.statusCode} : ${err.message}`);
            res.status(err.statusCode).send(err.message);
        } else {
            this.logger.error(err.message);
            res.status(500).send(err.message);
        }
    }
}