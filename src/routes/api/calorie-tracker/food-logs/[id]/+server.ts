import { requireUser } from "$lib/server/authHelper";
import { prisma } from "$lib/prisma";

export const PATCH = async ({ params, request, locals }) => {
    const user = requireUser(locals);

    const id = Number(params.id);
    if (!Number.isInteger(id)) {
        return new Response(JSON.stringify({ error: 'Invalid food log id' }), { status: 400 });
    }

    try {
        const { amount } : { amount: number} = await request.json();
        if (amount == null) {
            return new Response(JSON.stringify({ error: 'amount is required' }), { status: 400 });
        }

        // scope to the requesting user via the parent meal log
        const result = await prisma.foodLog.updateMany({
            where: { id, mealLog: { userId: user.id } },
            data: { amount },
        });

        if (result.count === 0) {
            return new Response(JSON.stringify({ error: 'Food log not found' }), { status: 404 });
        }

        return new Response(null, { status: 204 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Failed to update food log' }), { status: 500 });
    }
};

export const DELETE = async ({ params, locals }) => {
    const user = requireUser(locals);

    const id = Number(params.id);
    if (!Number.isInteger(id)) {
        return new Response(JSON.stringify({ error: 'Invalid food log id' }), { status: 400 });
    }

    try {
        // verify the food log exists AND belongs to this user before deleting
        const foodLog = await prisma.foodLog.findFirst({
            where: { id, mealLog: { userId: user.id } },
            select: { mealLogId: true }
        });

        if (!foodLog) {
            return new Response(JSON.stringify({ error: 'Food log not found' }), { status: 404 });
        }

        await prisma.$transaction(async (tx) => {
            await tx.foodLog.delete({ where: { id } });

            const remaining = await tx.foodLog.count({
                where: { mealLogId: foodLog.mealLogId }
            });

            // remove the parent meal log once it has no food logs left
            if (remaining === 0) {
                await tx.mealLog.delete({ where: { id: foodLog.mealLogId } });
            }
        });

        return new Response(null, { status: 204 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Failed to delete food log' }), { status: 500 });
    }
};