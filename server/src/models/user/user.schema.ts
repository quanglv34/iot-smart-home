import { object, TypeOf, string, nativeEnum } from "zod";
import prisma from "../../modules/database";
import { isEmailAvailable, isUserIdExists } from "./user.service";

export enum UserRole {
	ADMIN = "ADMIN",
	USER = "USER",
}

export const HasUserID = object({
	id: string({
		required_error: "User ID is required",
	}),
});

const User = object({
	username: string({
		required_error: "Username is required",
	}),
	name: string({
		required_error: "Name is required",
	}),
	email: string({
		required_error: "Email is required",
	})
		.email("Need to be a valid email")
		.refine(isEmailAvailable, {
			message: "Email exists in database",
		}),
	role: nativeEnum(UserRole),
});

export type UserSchema = TypeOf<typeof User>;

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserRequest:
 *      type: object
 *      required:
 *        - email
 *        - name
 *        - username
 *        - password
 *        - passwordConfirmation
 *        - role
 *      properties:
 *        username:
 *          type: string
 *          default: johndoe
 *        role:
 *          type: string
 *          default: USER
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        name:
 *          type: string
 *          default: Jane Doe
 *        password:
 *          type: string
 *          default: stringPassword123
 *        passwordConfirmation:
 *          type: string
 *          default: stringPassword123
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        id:
 *          type: string
 *        username:
 *          type: string
 *        role:
 *          type: string
 */
export const CreateUserRequest = object({
	body: object({
		password: string({
			required_error: "Name is required",
		}).min(6, "Password too short - should be 6 chars minimum"),
		passwordConfirmation: string({
			required_error: "passwordConfirmation is required",
		}),
	})
		.merge(User)
		.refine((data) => data.password === data.passwordConfirmation, {
			message: "Passwords do not match",
			path: ["passwordConfirmation"],
		}),
});

export const DeleteUserRequest = object({
	params: object({
		userId: string({
			required_error: "User ID is required",
		}).refine(isUserIdExists, {
			message: "User ID doesn't exist",
		}),
	}),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    EditUserRequest:
 *      type: object
 *      required:
 *        - role
 *        - name
 *      properties:
 *        role:
 *          type: string
 *          default: ADMIN
 *        name:
 *          type: string
 *          default: Jane Doe
 */
export const EditUserRequest = object({
	body: object({
		name: string().optional(),
		role: nativeEnum(UserRole).optional(),
	}),
	params: object({
		userId: string({
			required_error: "User ID is required",
		}),
	}),
});

export const ViewUserRequest = object({
	params: object({
		userId: string({
			required_error: "User ID is required",
		}),
	}),
});
