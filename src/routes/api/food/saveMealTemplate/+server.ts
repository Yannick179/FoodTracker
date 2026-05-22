import { prisma } from "$lib/prisma";
import {requireUser} from "$lib/server/authHelper";


export const POST = async ({ request, locals }) => {
    const user = requireUser(locals);
    try {
        const {  } =
            await request.json();

    }
    catch (error) {
    }
}