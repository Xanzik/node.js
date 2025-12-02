import type { NextFunction, Router, Request, Response } from 'express';

export interface IRoute {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	method: keyof Pick<Router, 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options'>;
}
