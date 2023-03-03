import validateRequest from "../../middleware/validateRequest"
import {NextFunction, Request, Response, Router} from "express"
import {CreateZoneRequest, EditZoneRequest, HasZoneId} from "./zone.schema";
import {
	addZoneMemberController,
	createZoneController, deleteZoneController, deleteZoneMemberController,
	editZoneController,
	listPropertyZonesController,
	viewZoneController, viewZoneMembersController
} from "./zone.controller";
import {findZoneById, findZoneMemberById} from "./zone.service";
import {verifyPropertyId} from "../property/property.router";
import {object, string, TypeOf} from "zod";
import {verifyUserId} from "../user/user.router";

const zoneRouter = Router({mergeParams: true})

export const verifyZoneId = async (
	req: Request<TypeOf<typeof HasZoneId>, {}, {}>,
	res: Response,
	next: NextFunction
) => {
	try {
		HasZoneId.passthrough().parse(req.params);
	} catch (e: any) {
		return res.status(400).send(e.errors);
	}

	const zone = await findZoneById(req.params.zoneId);

	if (!zone) {
		return res.status(400).send({ message: "Zone ID doesn't exists" });
	}
	res.locals.zone = zone;
	next();
};

export const HasZoneMemberId = object({
	zoneMemberId: string({
		required_error: "ZoneMember ID is required"
	})
})

export const verifyZoneMemberId = async (
	req: Request<TypeOf<typeof HasZoneMemberId>, {}, {}>,
	res: Response,
	next: NextFunction
) => {
	try {
		HasZoneMemberId.passthrough().parse(req.params);
	} catch (e: any) {
		return res.status(400).send(e.errors);
	}

	const zoneMember = await findZoneMemberById(req.params.zoneMemberId);

	if (!zoneMember) {
		return res.status(400).send({ message: "ZoneMember ID doesn't exists" });
	}
	res.locals.zoneMember = zoneMember;
	next();
};

zoneRouter.param("zoneId", verifyZoneId)
zoneRouter.param("propertyId", verifyPropertyId)
zoneRouter.param("userId", verifyUserId)
zoneRouter.param("zoneMemberId", verifyZoneMemberId)

/**
 * @openapi
 * /properties/{propertyId}/zones:
 *  post:
 *   tags: [Zone]
 *   summary: Create a zone inside the property
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
 *       $ref: '#/components/schemas/CreateZoneRequest'
 *   responses:
 *    200:
 *     description: Success
 */
zoneRouter.post(
	"/properties/:propertyId/zones",
	validateRequest(CreateZoneRequest),
	createZoneController
)

/**
 * @openapi
 * /properties/{propertyId}/zones:
 *  get:
 *   tags: [Zone]
 *   summary: List all zones the property
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
zoneRouter.get(
	"/properties/:propertyId/zones",
	listPropertyZonesController
)

/**
 * @openapi
 * /zones/{zoneId}:
 *  get:
 *   tags: [Zone]
 *   summary: View zone
 *   parameters:
 *    - in: path
 *      name: zoneId
 *      schema:
 *       type: string
 *       required: true
 *      description: The zone ID
 *   responses:
 *    200:
 *     description: Success
 */
zoneRouter.get("/zones/:zoneId", viewZoneController)

/**
 * @openapi
 * /zones/{zoneId}:
 *  delete:
 *   tags: [Zone]
 *   summary: Delete zone by ID
 *   parameters:
 *    - in: path
 *      name: zoneId
 *      schema:
 *       type: string
 *       required: true
 *      description: The zone ID
 *   responses:
 *    200:
 *     description: Success
 */
zoneRouter.delete("/zones/:zoneId", deleteZoneController)

/**
 * @openapi
 * /zones/{zoneId}:
 *  put:
 *   tags: [Zone]
 *   summary: Edit zone info
 *   parameters:
 *    - in: path
 *      name: zoneId
 *      schema:
 *       type: string
 *       required: true
 *      description: The zone ID
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/EditZoneRequest'
 *   responses:
 *    200:
 *     description: Success
 */
zoneRouter.put("/zones/:zoneId", validateRequest(EditZoneRequest), editZoneController)

/**
 * @openapi
 * /zones/{zoneId}/members:
 *  get:
 *   tags: [Zone]
 *   summary: View zone's members info
 *   parameters:
 *    - in: path
 *      name: zoneId
 *      schema:
 *       type: string
 *       required: true
 *      description: The zone ID
 *   responses:
 *    200:
 *     description: Success
 */
zoneRouter.get("/zones/:zoneId/members", viewZoneMembersController)

/**
 * @openapi
 * /zone-members/{zoneMemberId}:
 *  delete:
 *   tags: [Zone]
 *   summary: Remove a member from zone
 *   parameters:
 *    - in: path
 *      name: zoneMemberId
 *      schema:
 *       type: string
 *       required: true
 *      description: The zone member ID
 *   responses:
 *    200:
 *     description: Success
 */
zoneRouter.delete("/zone-members/:zoneMemberId", deleteZoneMemberController)

/**
 * @openapi
 * /zones/{zoneId}/members:
 *  post:
 *   tags: [Zone]
 *   summary: Add a member to zone
 *   parameters:
 *    - in: path
 *      name: zoneId
 *      schema:
 *       type: string
 *       required: true
 *      description: The zone ID
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/AddZoneMemberRequest'
 *   responses:
 *    200:
 *     description: Success
 */
zoneRouter.post("/zones/:zoneId/members", addZoneMemberController)

export default zoneRouter
