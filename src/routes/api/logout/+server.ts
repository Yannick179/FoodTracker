import type {RequestHandler} from "../../../../.svelte-kit/types/src/routes/api/login/$types";
import argon2 from "argon2";
import {prisma} from "$lib/prisma";
import {randomUUID} from "crypto";
import {redirect} from "@sveltejs/kit";

export const POST = async ({ cookies }) => {

    const token = cookies.get('session');

    if (token) {
        try {
            await prisma.session.deleteMany({
                where: {
                    token: token
                }
            });
        } catch (err) {
            console.error('Failed to delete session:', err);
        }
    }
    cookies.delete('session', { path: '/' });
    throw redirect(303, '/');
};
