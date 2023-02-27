import validateRequest from "../../middleware/validateRequest";
import {
	CreateUserRequest,
	DeleteUserRequest,
	EditUserRequest,
	ViewUserRequest,
} from "./user.schema";
import { Router } from "express";
import { createUser, deleteUser, editUser, listUsers, viewUser } from "./user.controller";

const userRouter = Router();

userRouter.use("/users", [
	/**
	 * @openapi
	 * /users:
	 *  post:
	 *   tags: [User]
	 *   summary: Register a user
	 *   requestBody:
	 *    required: true
	 *    content:
	 *     application/json:
	 *      schema:
	 *       $ref: '#/components/schemas/CreateUserRequest'
	 *   responses:
	 *    200:
	 *     description: Success
	 */
	userRouter.post("", validateRequest(CreateUserRequest), createUser),

	/**
	 * @openapi
	 * /users:
	 *  get:
	 *      tags:
	 *      - User
	 *      summary: Get list of users
	 *      responses:
	 *          200:
	 *              description: Success
	 */
	userRouter.get("", listUsers),

	/**
	 * @openapi
	 * /users/{userId}:
	 *  delete:
	 *   summary: Delete user by user ID
	 *   tags: [User]
	 *   parameters:
	 *    - in: path
	 *      name: userId
	 *      schema:
	 *       type: string
	 *       required: true
	 *      description: The user ID
	 *   responses:
	 *    200:
	 *     description: Success
	 */
	userRouter.delete(
		"/:userId",
		validateRequest(DeleteUserRequest),
		deleteUser
	),

	/**
	 * @openapi
	 * /users/{userId}:
	 *  put:
	 *   summary: Update user by user ID
	 *   tags: [User]
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
	 *       $ref: '#/components/schemas/EditUserRequest'
	 *   responses:
	 *    200:
	 *     description: Success
	 */
	userRouter.put("/:userId", validateRequest(EditUserRequest), editUser),

	/**
	 * @openapi
	 * /users/{userId}:
	 *  get:
	 *   summary: View user by user ID
	 *   tags: [User]
	 *   parameters:
	 *    - in: path
	 *      name: userId
	 *      schema:
	 *       type: string
	 *       required: true
	 *       description: The user ID
	 *   responses:
	 *    200:
	 *     description: Success
	 */
	userRouter.put("/:userId", validateRequest(ViewUserRequest), viewUser),
]);

export default userRouter;
