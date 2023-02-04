import prisma from "../database";
import {Response, Request} from "express";

export async function getDevices(req: Request, res: Response) {
    const devices = await prisma.device.findMany()
    res.json({data: devices})
}

export async function getDevice(req: Request, res: Response) {
    const device = await prisma.device.findFirst({
        where: {
            id: req.params.id,
        }
    })
    res.json({data: device})
}

export async function createDevice(req: Request, res: Response) {
    const device = await prisma.device.create({
        data: {
            name: req.body.name,
            type: req.body.type,
            description: req.body.description,
            ownerId: req.body.ownerId,
            token: 'secret token',
        }
    })
    res.json({data: device})
}

export async function updateDevice(req: Request, res: Response) {
    const updated = await prisma.device.update({
        where: {
            id: req.params.id
        },
        data: {
             name: req.body.name,
             description: req.body.description,
        }
    })
    res.json({data: updated})
}

export async function deleteDevice(req: Request, res: Response) {
    const deleted = prisma.device.delete({
        where: {
            id: req.params.id
        }
    })
    res.json({data: deleted})
}
