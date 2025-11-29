import {type ILogObj, Logger} from 'tslog'

export class LoggerService {
    private logger: Logger<ILogObj>;
    constructor() {
        this.logger = new Logger({
            minLevel: 3,
            type: "pretty",
            hideLogPositionForProduction: true,
            prettyLogTemplate: '{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}} {{logLevelName}} '
        });
    }
    log(...args: unknown[]): void {
        this.logger.info(...args);
    }
    error(...args: unknown[]): void {
        this.logger.error(...args);
    }
    warn(...args: unknown[]): void {
        this.logger.warn(...args);
    }
}