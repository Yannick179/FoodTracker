import type {RequestHandler} from "../../../../.svelte-kit/types/src/routes/api/login/$types";
import argon2 from "argon2";
import {prisma} from "$lib/prisma";
import {randomUUID} from "crypto";

export const POST = async ({ cookies }) => {

    const token = cookies.get('session');

    if (token) {
        const res = await prisma.session.delete({
            where: {
                token: token,
            }
        });
        return new Response(null, { status: 204 });
    }
    return new Response(null, { status: 404 });
};


//
// export const POST: RequestHandler = async ({ request }) => {
//     try {
//         const {email, password} = await request.json();
//
//
//
//         const existingUser = await prisma.user.findUnique({
//             where: {
//                 email: normalizedEmail
//             }
//         });
//
//         if (!existingUser) {
//             return new Response(JSON.stringify({ error: 'Invalid User' }), { status: 400 });
//         }
//
//         const validPassword = await argon2.verify(existingUser.passwordHash, password);
//         if (validPassword) {
//             const token = randomUUID();
//             await prisma.session.create({
//                 data: {
//                     token,
//                     userId: existingUser.id,
//                     expires: new Date(Date.now() + 1000 * 60 * 60)
//                 }
//             });
//
//
//             return new Response(JSON.stringify({ success: true }), {
//                 status: 200,
//                 headers: {
//                     "Set-Cookie": `session=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax; Secure`
//                 }
//             });
//         }
//         return new Response(JSON.stringify({ error: "Invalid password." }), { status: 400 });
//
//     } catch (error) {
//         console.log(error);
//         return new Response(JSON.stringify({ error: "Something went wrong." }), { status: 400 });
//     }
// }