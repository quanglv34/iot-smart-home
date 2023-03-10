import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validate =
	(schema: AnyZodObject) =>
	async (req: Request, res: Response, next: NextFunction) => {
		await schema
			.parseAsync({
				body: req.body,
				query: req.query,
				params: req.params,
			})
			.then(() => {
				next();
			})
			.catch((e: any) => {
				return res.status(400).send(e.errors);
			});
	};

export default validate;
