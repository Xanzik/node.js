import {Container, ContainerModule, type ContainerModuleLoadOptions} from "inversify";
import { App } from "./app.js";
import { LoggerService } from "./logger/logger.service.js";
import type { ILogger } from "./logger/logger.interface.js";
import { UserController } from "./users/userController.js";
import { ExceptionFilter } from "./errors/exception.filter.js";
import type { IExceptionFilter } from "./errors/exception.filter.interface.js";
import { TYPES } from "./types.js";
import type {IUserController} from "./users/userController.interface.js";

export const appBindings = new ContainerModule((options: ContainerModuleLoadOptions) => {
    options.bind<ILogger>(TYPES.ILogger).to(LoggerService);
    options.bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter);
    options.bind<IUserController>(TYPES.IUsersController).to(UserController);
    options.bind<App>(TYPES.Application).to(App);
});

function bootstrap (){
    const appContainer = new Container();
    appContainer.load(appBindings);
    const app = appContainer.get<App>(TYPES.Application);
    app.init();
    return {appContainer, app};
}

export const { app, appContainer } = bootstrap();