import validateRequest from "../../middleware/validateRequest";
import { Router } from "express";
import { createUserProperty } from "./property.controller";
import { CreateUserPropertyRequest } from "./property.schema";

const propertyRouter = Router()

propertyRouter.use("/users/:userId/properties", [
	/**
	 * @openapi
	 * /users/{userId}/properties:
	 *  post:
	 *   tags: [Property]
	 *   summary: Register a user
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
		"",
		validateRequest(CreateUserPropertyRequest),
		createUserProperty
	),
]);

export default propertyRouter