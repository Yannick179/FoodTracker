import { prisma } from "$lib/prisma";
import {requireUser} from "$lib/server/authHelper"

export const POST = async ({ request, locals }) => {
    const user = requireUser(locals);
    try {
        const { foodPortionId: foodPortionId, amount: amount} =
            await request.json();

        console.log(foodPortionId);
        console.log(amount);

        if ((!foodPortionId && foodPortionId != 0) || (!amount && amount != 0)) {
            return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
        }

        await prisma.foodLog.update({
            where: {
                id: foodPortionId,
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