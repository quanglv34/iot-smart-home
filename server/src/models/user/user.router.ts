import validateRequest from "../../middleware/validateRequest";
import {
	CreateUserRequest,
	DeleteUserRequest,
	EditUserRequest, HasUserId,
	ViewUserRequest,
} from "./user.schema";
import {NextFunction, Request, Response, Router} from "express";
import { createUser, deleteUser, editUser, listUsers, viewUser } from "./user.controller";
import {findUserById} from "./user.service";

const userRouter = Router();

export const verifyUserId = async (req: Request, res: Response, next: NextFunction) => {
	try {
		HasUserId.passthrough().parse(req.params);
	} catch (e: any) {
		return res.status(400).send(e.errors);
	}

	const user = await findUserById(req.params.userId);

	if (!user) {
		return res.status(400).send({ message: "User ID doesn't exists" });
	}
	res.locals.user = user;
	next();
};

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
