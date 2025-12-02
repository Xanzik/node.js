import { Container, ContainerModule, type ContainerModuleLoadOptions } from 'inversify';
import { App } from './app';
import { TYPES } from './types';
import { LoggerService } from './logger/logger.service';
import type { ILogger } from './logger/logger.interface';
import { UserController } from './users/userController';
import { ExceptionFilter } from './errors/exception.filter';
import type { IExceptionFilter } from './errors/exception.filter.interface';
import type { IUserController } from './users/userController.interface';

export interface IBootstrapReturn {
	app: App;
	appContainer: Container;
}

export const appBindings = new ContainerModule((options: ContainerModuleLoadOptions) => {
	options.bind<ILogger>(TYPES.ILogger).to(LoggerService);
	options.bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter);
	options.bind<IUserController>(TYPES.IUsersController).to(UserController);
	options.bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
