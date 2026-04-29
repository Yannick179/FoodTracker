import type {RequestHandler} from "../../../../.svelte-kit/types/src/routes/api/login/$types";
import argon2 from 'argon2';
import { randomUUID } from 'crypto';
import { prisma } from "$lib/prisma";

function isValidPassword(password: string): boolean {
    if (password.length < 10) return false;

    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    return hasLower && hasUpper && hasNumber && hasSpecial;
}

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


export const POST: RequestHandler = async ({ request }) => {
    try {
        console.log("does this reach?");
        const {email, password} = await request.json();
        if (!isValidPassword(password)) return new Response(JSON.stringify({ error: 'Invalid Password' }), { status: 400 });
        let hashedPassword = await argon2.hash(password);
        if (!isValidEmail(email)) return new Response(JSON.stringify({ error: 'Invalid Email format' }), { status: 400 });
        const normalizedEmail = email.toLowerCase().trim();


        const existingUser = await prisma.user.findUnique({
            where: {
                email: normalizedEmail
            }
        });

        if (!existingUser) {
            return new Response(JSON.stringify({ error: 'Invalid User' }), { status: 400 });
        }

        const validPassword = await argon2.verify(existingUser.passwordHash, password);
        if (validPassword) {
            const token = randomUUID();
            await prisma.session.create({
                data: {
                    token,
                    userId: existingUser.id,
                    expires: new Date(Date.now() + 1000 * 60 * 60)
                }
            });
            console.log("log in Successfull");
            return new Response(null, {
                status: 302,
                headers: {
                    "Set-Cookie": `session=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax; Secure`,
                    "Location": "/home"
                }
            });
        }
        return new Response(JSON.stringify({ error: "Invalid password." }), { status: 400 });

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "Something went wrong." }), { status: 400 });
    }
}