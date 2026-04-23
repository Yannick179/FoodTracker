import type {RequestHandler} from "../../../../.svelte-kit/types/src/routes/api/addfood/$types";
import {getDummyUser} from "$lib/server/DummyUser";
import { prisma } from "$lib/prisma";

export const POST: RequestHandler = async ({ request }) => {
    try {
        let user = await getDummyUser();
        const { foodid, amount, userid } = await request.json();

        // DONT USE USER FROM THE REQUEST ITS PLACEHOLDER

        // Basic validation
        if ((!foodid && foodid != 0) || (!amount && amount != 0) || (!user.id && user.id != 0) ) {
            return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
        }
        console.log(foodid, amount, userid);

        await prisma.foodEntry.create({
            data: {
                userId: user.id,
                foodId: foodid,
                amount: amount
            }
        });
        return new Response(null, { status: 201 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Failed to save food entry' }), { status: 500 });
    }
};