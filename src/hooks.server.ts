import type { Handle } from '@sveltejs/kit';
import { prisma } from "$lib/prisma";

const publicRoutes = ['/login', '/register'];

export const handle: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get('session');
    const path = event.url.pathname;


    // const isPublic = publicRoutes.includes(path) || path.startsWith('/api/register') || path.startsWith('/api/login');

    // if (!isPublic) {
    if (token) {
        const session = await prisma.session.findUnique({
            where: { token },
            include: { user: true }
        });

        // check if session is valid
        if (session && session.expires > new Date()) {
            event.locals.user = session.user;

            // 🔄 OPTIONAL: refresh session (sliding expiration)
            const newExpiry = new Date(Date.now() + 1000 * 60 * 60); // 1hour from now on valid

            await prisma.session.update({
                where: { token },
                data: { expires: newExpiry }
            });

            event.cookies.set('session', token, {
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60,
                sameSite: 'lax',
                secure: true
            });
        } else {

            // session expired → clean up
            if (session) {
                await prisma.session.delete({ where: { token } });
            }

            event.cookies.delete('session', { path: '/' });
        }
    }
    // }
    return resolve(event);
};