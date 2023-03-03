import prisma from "../../modules/database";

export const findPropertyMemberById = async (value) => {
	try {
		const propertyMember = await prisma.propertyMember.findFirst({
			where: {
				id: value,
			},
		});
		return propertyMember;
	} catch (e) {
		return null;
	}
};
