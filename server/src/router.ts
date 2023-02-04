import {Router} from "express"
import prisma from "./database"
import {body, validationResult} from "express-validator"
import {handleInputErrors} from "./modules/middleware"
import {createDevice, deleteDevice, getDevice, getDevices, updateDevice} from "./handlers/device"

const router = Router();

// Start of Devices API
router.get('/devices', async (req, res) => {
    await getDevices(req, res)
})

router.get('/devices/:id', async (req, res) => {
    await getDevice(req, res)
})

router.post('/devices',
    [
        body('name').exists().isString(),
        body('type').optional().isNumeric(),
        body(['description', 'ownerId']).optional().isString(),
        handleInputErrors
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400)
            res.json({errors: errors.array()})
        }
        await createDevice(req, res)
    })

router.delete('/devices/:id', async (req, res) => {
    await deleteDevice(req, res)
})

router.put('/devices/:id', async (req, res) => {
    await updateDevice(req, res)
})
// End of devices API


export default router;
