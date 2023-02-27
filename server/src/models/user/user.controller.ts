import { Request, Response, NextFunction } from "express";
import { TypeOf } from "zod";
import prisma from "../../modules/database";
import { CreateUserRequest, EditUserRequest, ViewUserRequest } from "./user.schema";

export const createUser = async (
	req: Request<
		{},
		{},
		Omit<
			TypeOf<typeof CreateUserRequest>,
			"body.passwordConfirmation"
		>["body"]
	>,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = await prisma.user.create({
			data: {
				name: req.body.name,
				username: req.body.username,
				role: req.body.role,
				email: req.body.email,
				password: req.body.password,
			},
		});
		res.json({ data: user });
	} catch (e) {
		next(e);
	}
};

export const listUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				username: true,
				role: true,
			},
		});
		res.json({ data: users });
	} catch (e) {
		next(e);
	}
};

export const viewUser = async (
	req: Request<TypeOf<typeof ViewUserRequest>["params"], {}, {}>,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = await prisma.user.findFirst({
			where: {
				id: req.params.userId
			},
			select: {
				id: true,
				name: true,
				email: true,
				username: true,
				role: true,
			},
		});
		res.json({ data: user });
	} catch (e) {
		next(e);
	}
};


export const deleteUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = await prisma.user.delete({
			where: {
				id: req.params.userId,
			},
			select: {
				id: true,
				name: true,
				email: true,
				username: true,
				role: true,
			},
		});
		res.json({ data: user });
	} catch (e) {
		next(e);
	}
};

export const editUser = async (
	req: Request<
		TypeOf<typeof EditUserRequest>["params"],
		{},
		TypeOf<typeof EditUserRequest>["body"]
	>,
	res: Response,
	next: NextFunction
) => {
	try {
		const updatedUser = await prisma.user.update({
			where: {
				id: req.params.userId,
			},
			data: {
				name: req.body.name,
				role: req.body.role,
			},
		});
		res.json({ data: updatedUser });
	} catch (e) {
		next(e);
	}
}