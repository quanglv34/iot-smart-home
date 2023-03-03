import {NextFunction, Request, Response} from "express";
import prisma from "../../modules/database";
import {TypeOf} from "zod";
import {HasPropertyMemberId, invitePropertyMemberRequest, PropertyMemberStatus} from "./propertyMember.schema";
import {findUserById} from "../user/user.service";
import {isUserBelongToProperty} from "../property/property.service";
import {Property} from "@prisma/client";


export const invitePropertyMemberController = async (
	req: Request<TypeOf<typeof invitePropertyMemberRequest>["params"], {}, TypeOf<typeof invitePropertyMemberRequest>["body"]>,
	res: Response<{}, { property: Property }>,
	next: NextFunction
) => {
	try {
		const user = await findUserById(req.body.userId)

		if (!user) {
			return res.status(400).json({message: "User ID doesn't exist"})
		}

		if (await isUserBelongToProperty(res.locals.property, user)) {
			throw Error(`User with ID ${user.id} already belong to the property`)
		}

		const propertyMember = await prisma.propertyMember.create({
			data: {
				userId: req.body.userId,
				propertyId: req.params.propertyId,
			}
		})

		return res.json({data: propertyMember})
	} catch (e) {
		next(e)
	}

}
export const acceptPropertyInvitationController = async (
	req: Request<TypeOf<typeof HasPropertyMemberId>, {}, {}>,
	res: Response,
	next: NextFunction
) => {
	try {
		const propertyMember = await prisma.propertyMember.update({
			where: {
				id: req.params.propertyMemberId,
			},
			data: {
				status: PropertyMemberStatus.ACCEPTED,
			},
		})

		return res.json({data: propertyMember})
	} catch (e) {
		next(e)
	}
}
export const declinePropertyInvitationController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const propertyMember = await prisma.propertyMember.delete({
			where: {
				id: req.params.propertyMemberId,
			},
		})

		return res.json({data: propertyMember})
	} catch (e) {
		next(e)
	}
}
export const listPropertyMembers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const propertyMembers = await prisma.property.findFirst({
			where: {
				id: req.params.propertyId,
			},
			include: {
				members: true,
			}
		})

		return res.json({data: propertyMembers})
	} catch (e) {
		next(e)
	}
}
export const deletePropertyMemberController = async (
	req: Request<TypeOf<typeof HasPropertyMemberId>, {}, {}>,
	res: Response,
	next: NextFunction
) => {
	try {
		const propertyMember = await prisma.propertyMember.delete({
			where: {
				id: req.params.propertyMemberId,
			},
		})

		return res.json({data: propertyMember})
	} catch (e) {
		next(e)
	}
}
