import prisma from "../database";
import bcrypt from "bcrypt";
import {comparePasswords, createJWT, hashPassword} from "../modules/auth";

export async function createUser(req, res) {
    const user = await prisma.user.create({
        data: {
            password: await hashPassword(req.body.password),
            email: req.body.email,
            name: req.body.name,
            username: req.body.username
        }
    })

    const token = createJWT(user)
    res.json({token})
}

export async function signIn(req, res) {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username as string,
        }
    })

    const isValid = await comparePasswords(req.body.password, user.password)

    if (!isValid) {
        res.status(401)
        res.json({message: 'Wrong password.'})
    }
    const token = createJWT(user)
    res.json({token})
}
