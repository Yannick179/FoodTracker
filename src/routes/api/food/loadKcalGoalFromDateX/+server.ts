import {requireUser} from "$lib/server/authHelper";
import {prisma} from "$lib/prisma";
import {json} from "@sveltejs/kit";


export const GET = async ({ url, locals }) => {
    const user = requireUser(locals);
    try{
        // @ts-ignore
        const date: Date  = new Date(url.searchParams.get('date'));
        console.log(date);

        const res = await prisma.kcalGoal.findFirst({
            where: {
                userId: user.id,
                createdAt: {
                    lte: date
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        console.log(res);
        return json({
            goal: res,
        });
    }
    catch(err) {
        console.log(err);
        return new Response(JSON.stringify({ error: 'Failed to get goal' }), { status: 500 });
    }

}
