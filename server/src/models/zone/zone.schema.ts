import {object, string} from "zod";

export const HasZoneId = object({
	zoneId: string({
		required_error: "Zone ID is required to create a property",
	}),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateZoneRequest:
 *      type: object
 *      required:
 *        - name
 *        - description
 *      properties:
 *        name:
 *          type: string
 *          default: Living room of John Doe home
 *        description:
 *          type: string
 *          default: Living room
 */
export const CreateZoneRequest = object({
	body: object({
		name: string({
			required_error: "Name of zone is required",
		}),
		description: string({
			required_error: "Description of zone is required",
		}),
	}),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    EditZoneRequest:
 *      type: object
 *      required:
 *        - name
 *        - description
 *      properties:
 *        name:
 *          type: string
 *          default: Another Living room of John Doe home
 *        description:
 *          type: string
 *          default: Another Living room
 */
export const EditZoneRequest = object({
	body: object({
		name: string({
			required_error: "Name of zone is required",
		}),
		description: string({
			required_error: "Description of zone is required",
		}),
	}),
})

/**
 * @openapi
 * components:
 *  schemas:
 *    AddZoneMemberRequest:
 *      type: object
 *      required:
 *        - userId
 *      properties:
 *        userId:
 *          type: string
 *          default: 012345678910
 */
export const AddZoneMemberRequest = object({
	body: object({
		userId: string({
			required_error: "User ID is required",
		}),
	}),
})
