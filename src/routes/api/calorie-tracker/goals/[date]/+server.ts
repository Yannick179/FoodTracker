import { requireUser } from "$lib/server/authHelper";
import { prisma } from "$lib/prisma";
import { json } from "@sveltejs/kit";

export const GET = async ({ params, locals }) => {
    const user = requireUser(locals);

    const date = new Date(params.date);
    if (isNaN(date.getTime())) {
        return new Response(JSON.stringify({ error: 'valid date is required' }), { status: 400 });
    }
    date.setHours(0, 0, 0, 0);

    try {
        // the goal in effect for this day = most recent goal set on or before it
        const goal = await prisma.kcalGoal.findFirst({
            where: {
                userId: user.id,
                createdAt: { lte: date },
            },
            orderBy: { createdAt: 'desc' },
        });

        return json(goal);
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Failed to get goal' }), { status: 500 });
    }
};

export const PUT = async ({ params, request, locals }) => {
    const user = requireUser(locals);

    const date = new Date(params.date);
    if (isNaN(date.getTime())) {
        return new Response(JSON.stringify({ error: 'valid date is required' }), { status: 400 });
    }
    date.setHours(0, 0, 0, 0); // normalize to the start of the day so one day = one goal

    try {
        const { calories, protein, carbohydrates, fats } = await request.json();

        if (calories == null || protein == null || carbohydrates == null || fats == null) {
            return new Response(JSON.stringify({ error: 'calories, protein, carbohydrates and fats are required' }), { status: 400 });
        }

        const goal = await prisma.kcalGoal.upsert({
            where: {
                userId_createdAt: {
                    userId: user.id,
                    createdAt: date,
                },
            },
            update: {
                kcal: calories,
                protein,
                carbohydrates,
                fats,
            },
            create: {
                userId: user.id,
                createdAt: date,
                kcal: calories,
                protein,
                carbohydrates,
                fats,
            },
        });

        return json(goal);
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Failed to save goal' }), { status: 500 });
    }
};