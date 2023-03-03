import {NextFunction, Request, Response, Router} from "express";
import {HasPropertyMemberId, invitePropertyMemberRequest} from "./propertyMember.schema";
import {findPropertyMemberById} from "./propertyMember.service";
import {verifyPropertyId} from "../property/property.router";
import validateRequest from "../../middleware/validateRequest";
import {
	acceptPropertyInvitationController, declinePropertyInvitationController,
	deletePropertyMemberController,
	invitePropertyMemberController, listPropertyMembers
} from "./propertyMember.controller";

export const verifyPropertyMemberId = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const params = HasPropertyMemberId.parse(req.params);

		const propertyMember = findPropertyMemberById(params.propertyMemberId);

		if (!propertyMember) {
			return res.status(400).send({message: "PropertyMember ID doesn't exists"});
		}
		res.locals.property = propertyMember;
		next();
	} catch (e: any) {
		return res.status(400).send(e.errors);
	}
};

const propertyMemberRouter = Router({mergeParams: true})
propertyMemberRouter.param("propertyMemberId", verifyPropertyMemberId)
propertyMemberRouter.param("propertyId", verifyPropertyId)

/**
 * @openapi
 * /properties/{propertyId}/members:
 *  post:
 *   tags: [PropertyMember]
 *   summary: Invite a user to property
 *   parameters:
 *    - in: path
 *      name: propertyId
 *      schema:
 *       type: string
 *       required: true
 *      description: The property ID
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/InvitePropertyMemberRequest'
 *   responses:
 *    200:
 *     description: Success
 */
propertyMemberRouter.post(
	"/properties/:propertyId/members",
	validateRequest(invitePropertyMemberRequest),
	invitePropertyMemberController
)

/**
 * @openapi
 * /properties/{propertyId}/members:
 *  get:
 *   tags: [PropertyMember]
 *   summary: List members of the property
 *   parameters:
 *    - in: path
 *      name: propertyId
 *      schema:
 *       type: string
 *       required: true
 *      description: The property ID
 *   responses:
 *    200:
 *     description: Success
 */
propertyMemberRouter.get("/properties/:propertyId/members", listPropertyMembers)

/**
 * @openapi
 * /property-members/{propertyMemberId}:
 *  delete:
 *   tags: [PropertyMember]
 *   summary: Remove a member from the property
 *   parameters:
 *    - in: path
 *      name: propertyMemberId
 *      schema:
 *       type: string
 *       required: true
 *      description: The property member ID
 *   responses:
 *    200:
 *     description: Success
 */
propertyMemberRouter.delete("/property-members/:propertyMemberId", deletePropertyMemberController)

/**
 * @openapi
 * /property-members/{propertyMemberId}/accept:
 *  put:
 *   tags: [PropertyMember]
 *   summary: Accept a property member invitation
 *   parameters:
 *    - in: path
 *      name: propertyMemberId
 *      schema:
 *       type: string
 *       required: true
 *      description: The property member ID
 *   responses:
 *    200:
 *     description: Success
 */
propertyMemberRouter.put("/property-members/:propertyMemberId/accept", acceptPropertyInvitationController)

/**
 * @openapi
 * /property-members/{propertyMemberId}/decline:
 *  put:
 *   tags: [PropertyMember]
 *   summary: Decline a property member invitation
 *   parameters:
 *    - in: path
 *      name: propertyMemberId
 *      schema:
 *       type: string
 *       required: true
 *      description: The property member ID
 *   responses:
 *    200:
 *     description: Success
 */
propertyMemberRouter.put("/property-members/:propertyMemberId/decline", declinePropertyInvitationController)

export default propertyMemberRouter
