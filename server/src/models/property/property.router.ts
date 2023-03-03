import validateRequest from "../../middleware/validateRequest"
import {NextFunction, Request, Response, Router} from "express"
import {createUserProperty, deleteProperty, editProperty} from "./property.controller"
import {CreateUserPropertyRequest, EditPropertyRequest, HasPropertyId} from "./property.schema"
import {findPropertyById} from "./property.service";
import {verifyUserId} from "../user/user.router";

export const verifyPropertyId = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const params = HasPropertyId.parse(req.params);

		const property = await findPropertyById(params.propertyId);

		if (!property) {
			return res.status(400).send({ message: "Property ID doesn't exists" });
		}
		res.locals.property = property;
		next();
	} catch (e: any) {
		return res.status(400).send(e.errors);
	}
};

const propertyRouter = Router({mergeParams: true})
propertyRouter.param("propertyId", verifyPropertyId)
propertyRouter.param("userId", verifyUserId)

/**
 * @openapi
 * /properties/{propertyId}:
 *  put:
 *   tags: [Property]
 *   summary: Update property by ID
 *   parameters:
 *    - in: path
 *      name: propertyId
 *      schema:
 *       type: string
 *       required: true
 *      description: The user ID
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/EditPropertyRequest'
 *   responses:
 *    200:
 *     description: Success
 */
propertyRouter.put(
	"/properties/:propertyId",
	validateRequest(EditPropertyRequest),
	editProperty
)

/**
 * @openapi
 * /properties/{propertyId}:
 *  delete:
 *   tags: [Property]
 *   summary: Delete property by ID
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
propertyRouter.delete("/properties/:propertyId", deleteProperty)

/**
 * @openapi
 * /users/{userId}/properties:
 *  post:
 *   tags: [Property]
 *   summary: Create a new property for the user
 *   parameters:
 *    - in: path
 *      name: userId
 *      schema:
 *       type: string
 *       required: true
 *      description: The user ID
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/CreateUserPropertyRequest'
 *   responses:
 *    200:
 *     description: Success
 */
propertyRouter.post(
	"/users/:userId/properties",
	validateRequest(CreateUserPropertyRequest),
	createUserProperty
)

/**
 * @openapi
 * /users/{userId}/properties:
 *  get:
 *   tags: [Property]
 *   summary: Get properties list of the user
 *   parameters:
 *    - in: path
 *      name: userId
 *      schema:
 *       type: string
 *       required: true
 *      description: The user ID
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/CreateUserPropertyRequest'
 *   responses:
 *    200:
 *     description: Success
 */
propertyRouter.get(
	"/users/:userId/properties",
	validateRequest(CreateUserPropertyRequest),
	createUserProperty
)

export default propertyRouter
