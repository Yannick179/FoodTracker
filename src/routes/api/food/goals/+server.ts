import {requireUser} from "$lib/server/authHelper";
import { prisma } from "$lib/prisma";

export const POST = async ({ request, locals }) => {
    const user = requireUser(locals);
    try {
        const { calories, protein, carbohydrates, fats, date } =
            await request.json();
        console.log("date");
        console.log(date);


        const goalEntry = await prisma.kcalGoal.upsert({
            where: {
                userId_createdAt: {
                    userId: user.id,
                    createdAt: new Date(date),
                },
            },
            update: {
                protein,
                kcal: calories,
                carbohydrates,
                fats,
            },
            create: {
                userId: user.id,
                protein,
                kcal: calories,
                carbohydrates,
                fats,
                createdAt: new Date(date),
            },
        });
        return new Response(null, { status: 201 });
    }
    catch (e) {
        console.log(e);
        return new Response(JSON.stringify({ error: 'Failed to create new goal' }), { status: 500 });
    }
}

