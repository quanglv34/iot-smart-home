import {object, string} from "zod";
import {HasUserId} from "../user/user.schema";

export const HasPropertyId = object({
	propertyId: string({
		required_error: "User ID is required to create a property",
	}),
});

export const HasPropertySchema = object({
	name: string({
		required_error: "Name of property is required",
	}),
	description: string({
		required_error: "Description of property is required",
	}),
})
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
	params: object({}).merge(HasPropertyId).merge(HasUserId),
	body: object({}).merge(HasPropertySchema),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    EditPropertyRequest:
 *      type: object
 *      required:
 *        - name
 *        - description
 *      properties:
 *        name:
 *          type: string
 *          default: Workplace of John Doe
 *        description:
 *          type: string
 *          default: Workplace
 */
export const EditPropertyRequest = object({
	params: object({}).merge(HasPropertyId),
	body: object({}).merge(HasPropertySchema),
});
