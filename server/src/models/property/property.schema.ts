import { object, string } from "zod";
import { isUserIdExists } from "../user/user.service";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserPropertyRequest:
 *      type: object
 *      required:
 *        - name
 *        - description
 *      properties:
 *        name:
 *          type: string
 *          default: Home of John Doe
 *        description:
 *          type: string
 *          default: Home
 */
export const CreateUserPropertyRequest = object({
	params: object({
		userId: string({
			required_error: "User ID is required",
		}),
	}),
	body: object({
		name: string({
			required_error: "Name of property is required",
		}),
		description: string({
			required_error: "Description of property is required",
		}),
	}),
});