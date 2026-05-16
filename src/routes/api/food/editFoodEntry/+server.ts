import { prisma } from "$lib/prisma";
import {requireUser} from "$lib/server/authHelper"

export const POST = async ({ request, locals }) => {
    const user = requireUser(locals);
    try {
        const { foodEntryId: foodEntryId, amount: amount} =
            await request.json();

        console.log(foodEntryId);
        console.log(amount);

        if ((!foodEntryId && foodEntryId != 0) || (!amount && amount != 0)) {
            return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
        }

        await prisma.foodEntry.update({
            where: {
                id: foodEntryId,
            },
            data: {
                amount: amount,

            }
        });
        return new Response(null, { status: 204 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Failed to save food entry' }), { status: 500 });
    }
};