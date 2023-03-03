import {object, string} from "zod";
import {HasUserId} from "../user/user.schema";
import {HasPropertyId} from "../property/property.schema";

export enum PropertyMemberStatus {
	PENDING = 'PENDING',
	ACCEPTED = 'ACCEPTED',
}

export const HasPropertyMemberId = object({
	propertyMemberId: string({
		required_error: "PropertyMember ID is required"
	})
})

// export const HasPropertyMemberSchema = object({
// 	userId: string({
// 		required_error: "User ID is required",
// 	}),
// 	propertyId: string({
// 		required_error: "Property ID is required",
// 	}),
// })

/**
 * @openapi
 * components:
 *  schemas:
 *    InvitePropertyMemberRequest:
 *      type: object
 *      required:
 *        - userId
 *      properties:
 *        userId:
 *          type: string
 *          default: 012345678910
 */
export const invitePropertyMemberRequest = object({
	params: object({}).merge(HasPropertyId),
	body: object({}).merge(HasUserId)
})

