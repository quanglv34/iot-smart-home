import { prisma } from "./prisma";
import { json } from "express";
export async function register(registration) {
    const exists = await prisma.user.count({ where: { email: registration.email } });
    if (exists) {
        return json({ error: `User already exists with that email` }, { status: 400 });
    }
}
//# sourceMappingURL=auth.js.map