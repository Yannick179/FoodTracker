import { prisma } from "$lib/prisma";
import {requireUser} from "$lib/server/authHelper";


export const POST = async ({ request, locals }) => {
    const user = requireUser(locals);
    try {
        const { foodTemplates, mealName } =
            await request.json();

        await prisma.$transaction(async (tx) => {
            const mealTemplate = await tx.mealTemplate.create({
                data: {
                    name: mealName,
                    userId: user.id,
                }
            });
            for (const foodTemplate of foodTemplates) {
                let foodTemplateResult = await tx.foodPortionTemplate.create({
                    data: {
                        foodId: foodTemplate.foodId,
                        mealTemplateId: mealTemplate.id,
                        amount: foodTemplate.amount,
                    }
                })
            }


        });
        return new Response(null, { status: 204 });

    }
    catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to save meal template' }), { status: 500 });

    }
}