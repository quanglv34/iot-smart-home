import { Request, Response, NextFunction } from "express";
import { TypeOf, ZodNever } from "zod";
import prisma from "../../modules/database";
import {CreateUserPropertyRequest, EditPropertyRequest} from "./property.schema";


export const createUserProperty = async (
	req: Request<
		TypeOf<typeof CreateUserPropertyRequest>["params"],
		never,
		TypeOf<typeof CreateUserPropertyRequest>["body"]
	>,
	res: Response,
	next: NextFunction
) => {
	const property = await prisma.property.create({
		data: {
			ownerId: req.params.userId,
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

export const editProperty = async (
	req: Request<{}, {}, TypeOf<typeof EditPropertyRequest>["body"]>,
	res: Response,
	next: NextFunction
) => {
	const property = await prisma.property.update({
		where: {
			id: res.locals.property.id
		},
		data: {
			name: req.body.name,
			description: req.body.description
		}
	})

	return res.json({data: property})
};

export const deleteProperty = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const property = await prisma.property.delete({
		where: {
			id: res.locals.property.id
		},
	})

	return res.json({data: property})
};

export const listUserProperties = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};

export const listPropertyMembers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};

export const inviteUserToProperty = async () => {};
