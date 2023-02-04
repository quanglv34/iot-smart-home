import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export function comparePasswords(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword)
}

export function hashPassword(password) {
    return bcrypt.hash(password, 5)
}

export function createJWT(user) {
    const token = jwt.sign(
        {id: user.id, username: user.username},
        process.env.JWT_SECRET
    )
    return token
}

export function protect(req, res, next) {
    let bearer = req.headers.authorization

    if (!bearer) {
        res.status(401)
        res.json({message: 'Unauthorized.'})
        res.send()
        return
    }

    const [, token] = bearer.split(' ')


    if (!token) {
        res.status(401)
        res.json({message: 'Not a valid token.'})
        return
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (e) {
        console.log(e)
        res.status(401)
        res.json({message: 'Not a valid token.'})
        return
    }
}

// export async function register(registration: RegisterForm) {
//     const exists = await prisma.user.count({ where: { email: registration.email } })
//     if (exists) {
//         return json({ error: `User already exists with that email` }, { status: 400 })
//     }
// }
