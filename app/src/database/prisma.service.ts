import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { inject, injectable } from 'inversify';

import { PrismaClient } from '../generated/prisma/client';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

@injectable()
export class PrismaService {
	client: PrismaClient;
	constructor(@inject(TYPES.Logger) private logger: ILogger) {
		const adapter = new PrismaBetterSqlite3({ url: '../dev.db' });
		this.client = new PrismaClient({ adapter });
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.log(`[PrismaService] Connected to Prisma DB`);
		} catch (error) {
			if (error instanceof Error) {
				this.logger.error(`[PrismaService] ${error.message}`);
			}
		}
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
