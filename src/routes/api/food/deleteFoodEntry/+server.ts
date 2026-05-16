import { prisma } from "$lib/prisma";
import {requireUser} from "$lib/server/authHelper"

export const POST = async ({ request, locals }) => {
    const user = requireUser(locals);
    try {
        const { foodEntryId: foodEntryId} =
            await request.json();

        console.log(foodEntryId);

        if (!foodEntryId && foodEntryId != 0) {
            return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
        }

        await prisma.foodEntry.delete({
            where: {
                id: foodEntryId,
            },
        });
        return new Response(null, { status: 204 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Failed to delete food entry' }), { status: 500 });
    }
};