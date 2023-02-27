import {Router} from "express"
import prisma from "./database"

const router = Router();
/**
 * @openapi
 * /health-check:
 *  get:
 *     tags:
 *     - Health Check
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.get("/health-check", async (req, res) => {
    res.status(200).json("OK")
})

export default router;
