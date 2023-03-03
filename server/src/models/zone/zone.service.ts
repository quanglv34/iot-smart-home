import prisma from "../../modules/database";

export const findZoneById = async (zoneId) => {
	try {
		const zone = await prisma.zone.findFirst({
			where: {
				id: zoneId,
			},
		});
		return zone;
	} catch (e) {
		return null;
	}
};

export const findZoneMemberById = async (zoneMemberId) => {
	try {
		const zoneMember = await prisma.zoneMember.findFirst({
			where: {
				id: zoneMemberId,
			},
		});
		return zoneMember;
	} catch (e) {
		return null;
	}
};

