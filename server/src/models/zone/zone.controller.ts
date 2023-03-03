import {Request, Response, NextFunction} from "express";
import {TypeOf} from "zod";
import prisma from "../../modules/database";
import {AddZoneMemberRequest, CreateZoneRequest, EditZoneRequest, HasZoneId} from "./zone.schema";
import {User, Zone} from "@prisma/client";
import {isUserBelongToProperty} from "../property/property.service";
import {HasZoneMemberId} from "./zone.router";

export const createZoneController = async (
	req: Request<{}, {}, TypeOf<typeof CreateZoneRequest>["body"]>,
	res: Response, next: NextFunction
) => {
	try {
		const zone = await prisma.zone.create({
			data: {
				propertyId: res.locals.property.id,
				name: req.body.name,
				description: req.body.description
			}
		})
		res.json({data: zone})
	} catch (e) {
		next(e)
	}
}
export const viewZoneController = async (req: Request, res: Response, next: NextFunction) => {
	return res.json({data: res.locals.zone})
};
export const editZoneController = async (
	req: Request<TypeOf<typeof HasZoneId>, {}, TypeOf<typeof EditZoneRequest>["body"]>,
	res: Response, next: NextFunction
) => {
	try {
		const zone = await prisma.zone.update({
			where: {
				id: req.params.zoneId
			},
			data: {
				name: req.body.name,
				description: req.body.description,
			}
		})
		return res.json({data: zone})
	} catch (e) {
		next(e)
	}
};
export const deleteZoneController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const zone = await prisma.zone.delete({
			where: {
				id: req.params.zoneId
			}
		})

		return res.json({data: zone})
	} catch (e) {
		next(e)
	}
};
export const listPropertyZonesController = async (req: Request, res: Response, next: NextFunction) => {
	const zones = await prisma.zone.findMany({
		where: {
			propertyId: res.locals.property.id
		}
	})

	res.json({data: zones})
};

export const addZoneMemberController = async (
	req: Request<{}, {}, TypeOf<typeof AddZoneMemberRequest>["body"]>,
	res: Response<{}, HasZone>,
	next: NextFunction
) => {
	try {
		const zone = res.locals.zone
		const userId = req.body.userId

		const property = await prisma.property.findFirst({
			where: {
				id: zone.propertyId
			}
		})

		if (property.ownerId === userId) {
			throw Error(`User with ID ${userId} is already the owner of the zone`)
		}

		const user = await prisma.user
			.findFirstOrThrow({
				where: {
					id: userId
				}
			})

		if (!await isUserBelongToProperty(property, user)) {
			throw Error(`Cannot add user that doesn't belong to the property`)
		}

		const zoneMember = await prisma.zoneMember.create({
			data: {
				zoneId: zone.id,
				userId,
			}
		})

		return res.json({data: zoneMember})
	} catch (e) {
		next(e)
	}
}

export const deleteZoneMemberController = async (
	req: Request<TypeOf<typeof HasZoneMemberId>, {}, {}>,
	res: Response,
	next: NextFunction
) => {
	try {
		const zoneMember = await prisma.zoneMember.delete({
			where: {
				id: req.params.zoneMemberId,
			}
		})
		return res.json({data: zoneMember})
	} catch (e) {
		next(e)
	}
}

interface HasZone {
	zone: Zone
}

export const viewZoneMembersController = async (req: Request, res: Response<{}, HasZone>, next: NextFunction) => {
	try {
		const zoneMemberIds = await prisma.zoneMember.findMany({
			where: {
				zoneId: res.locals.zone.id
			}
		}).then(zoneMembers => zoneMembers.map(zoneMember => zoneMember.userId))

		const members = await prisma.user.findMany({
			where: {
				id: {
					in: zoneMemberIds
				}
			}
		})

		return res.json({data: members})
	} catch (e) {
		next(e)
	}

}
