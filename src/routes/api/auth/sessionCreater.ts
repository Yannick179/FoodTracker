import {randomUUID} from "crypto";
import {prisma} from "$lib/prisma";


export async function createSession(userId: number) {
    //expects the db UserId
    //creates a new token and a session in the db session table
    //session is valid for 1 hour
    //returns the token
    const token = crypto.randomUUID();

    try {
        await prisma.session.create({
            data: {
                token: token,
                userId: userId,
                expires: new Date(Date.now() + 1000 * 60 * 60),
            },
        });

        return token;
    } catch (err) {
        console.error("Failed to create session:", err);
        throw new Error("Could not create session");
    }

}