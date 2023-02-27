import { Request, Response, NextFunction } from "express";
import { TypeOf } from "zod";
import prisma from "../../modules/database";

export const createThing = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};
export const viewThing = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};
export const editThing = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};
export const deleteThing = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};
export const listThings = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};
