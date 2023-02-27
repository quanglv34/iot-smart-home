import { Request, Response, NextFunction } from "express";
import { TypeOf, ZodNever } from "zod";
import prisma from "../../modules/database";
import { CreateUserPropertyRequest } from "./property.schema";

export const createUserProperty = async (
	req: Request<
		never,
		never,
		TypeOf<typeof CreateUserPropertyRequest>["body"]
	>,
	res: Response,
	next: NextFunction
) => {
	const user = await prisma.user.findFirst({
		where: {
			id: res.locals.user
		}
	})

	if(!user) {
		next(Error("User ID doesn't exists"))
		return
	}

	const property = await prisma.property.create({
		data: {
			ownerId: user.id,
			description: req.body.description,
			name: req.body.name,
		}
	})

	res.json({ data: property })
};

export const viewUserProperty = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};

export const editUserProperty = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};

export const deleteUserProperty = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};

export const listUserProperties = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};

export const inviteUserToProperty = async () => {};
