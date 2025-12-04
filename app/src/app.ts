import express, { type Express } from 'express';
import { injectable, inject } from 'inversify';

import { TYPES } from './types';

import type { IExceptionFilter } from './errors/exception.filter.interface';
import type { ILogger } from './logger/logger.interface';
import type { IUserController } from './users/users.controller.interface';
import type { Server } from 'http';

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

	useMiddleware(): void {
		this.app.use(express.json());
	}

	useRoutes(): void {
		this.app.use('/users', this.usersController.router);
	}

	useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server listening on http://localhost:${this.port}`);
	}
}
