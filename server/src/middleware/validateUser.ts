import { Request, Response, NextFunction } from "express";
import { AnyZodObject, object, string } from "zod";

const HasUserId = object({
	userId: string({
		required_error: "User ID is required to create a property",
	}),
});

const validate =
	() => async (req: Request, res: Response, next: NextFunction) => {
		await HasUserId.parseAsync(req.params)
			.then(() => {
				next();
			})
			.catch((e: any) => {
				return res.status(400).send(e.errors);
			});
	};

export default validate;
