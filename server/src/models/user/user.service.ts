import prisma from "../../modules/database";

export const findUserById = async (value) => {
	try {
		const user = await prisma.user.findFirst({
			where: {
				id: value,
			},
		});
		return user;
	} catch (e) {
		return false;
	}
};

export const isEmailAvailable = async (value) => {
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: value,
			},
			select: {
				email: true,
			},
		});
		return !user;
	} catch (e) {
		return false;
	}
};
