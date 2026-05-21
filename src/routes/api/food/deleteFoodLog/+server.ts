import { prisma } from "$lib/prisma";
import {requireUser} from "$lib/server/authHelper"

export const POST = async ({ request, locals }) => {
    const user = requireUser(locals);
    try {
        const { foodLogId: foodLogId} =
            await request.json();

        console.log(foodLogId);

        if (!foodLogId && foodLogId != 0) {
            return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
        }

        await prisma.$transaction(async (tx) => {

            // 1. delete foodlog
            const deleted = await tx.foodLog.delete({
                where: { id: foodLogId },
                select: { mealLogId: true }
            });

            const mealLogId = deleted.mealLogId;

            // 2. check if any food logs remain
            const count = await tx.foodLog.count({
                where: { mealLogId }
            });

            // 3. delete meal log if empty
            if (count === 0) {
                await tx.mealLog.delete({
                    where: { id: mealLogId }
                });
            }
        });

        return new Response(null, { status: 204 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Failed to delete food entry' }), { status: 500 });
    }
};