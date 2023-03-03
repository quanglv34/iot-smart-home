import prisma from "../../modules/database";
import {Property, User} from "@prisma/client";
import {string} from "zod";

export const findPropertyById = async (value) => {
	try {
		const property = await prisma.property.findFirst({
			where: {
				id: value,
			},
		});
		return property;
	} catch (e) {
		return null;
	}
};

export const isUserBelongToProperty = async (property: Property, user: User) => {
	const members = await prisma.propertyMember.findMany({
		where: {
			propertyId: property.id
		}
	}).then(members => members.map(member => member.userId))

	return members.find(id => id === user.id)
}
