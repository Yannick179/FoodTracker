import { prisma } from "$lib/prisma";
import {requireUser} from "$lib/server/authHelper"

export const POST = async ({ request, locals }) => {
    const user = requireUser(locals);
    try {
        const { foodId: foodId, amount: amount, userId: userid, date: date } =
            await request.json();

        // DONT USE USER FROM THE REQUEST ITS PLACEHOLDER

        // Basic validation
        if ((!foodId && foodId != 0) || (!amount && amount != 0) || (!user.id && user.id != 0) || !date) {
            return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
        }
        console.log(foodId, amount, userid, date);

        await prisma.$transaction(async (tx) => {
            const mealLog = await tx.mealLog.create({
                data: {
                    userId: user.id,
                    eatenAt: date,
                    name: "",
                    foodLogs: {
                        create: {
                            foodId,
                            amount,
                        }
                    }
                }
            })

            return mealLog;
        })

        return new Response(null, { status: 204 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Failed to save food entry' }), { status: 500 });
    }
};