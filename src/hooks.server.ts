//OLD VERSION

// import {error, type Handle} from '@sveltejs/kit';
// import { prisma } from "$lib/prisma";
//
// const publicRoutes = ['/login', '/register', '/', '/api/login', '/api/register'];
//
// export const handle: Handle = async ({ event, resolve }) => {
//     const token = event.cookies.get('session');
//     const path = event.url.pathname;
//     console.log("paths:" +  path);
//
//     if (publicRoutes.includes(path)) {
//         //TODO: rework - if user logged in dont let him get to register, login and /
//         // if (token) {
//         //     const session = await prisma.session.findUnique({
//         //         where: {token},
//         //         include: {user: true}
//         //     });
//         //     if (session && session.expires > new Date()) {
//         //         throw error(401, "Already authenticated");
//         //     }
//         // }
//         return resolve(event);
//     }
//     if (token) {
//         const session = await prisma.session.findUnique({
//             where: { token },
//             include: { user: true }
//         });
//
//         // check if session is valid
//         if (session && session.expires > new Date()) {
//             event.locals.user = session.user;
//
//             // 🔄 OPTIONAL: refresh session (sliding expiration)
//             const newExpiry = new Date(Date.now() + 1000 * 60 * 60); // 1hour from now on valid
//
//             await prisma.session.update({
//                 where: { token },
//                 data: { expires: newExpiry }
//             });
//
//             event.cookies.set('session', token, {
//                 httpOnly: true,
//                 path: '/',
//                 maxAge: 60 * 60,
//                 sameSite: 'lax',
//                 secure: true
//             });
//             return resolve(event);
//         }
//         else
//         {
//
//             // session expired → clean up
//             if (session) {
//                 await prisma.session.delete({ where: { token } });
//             }
//
//             event.cookies.delete('session', { path: '/' });
//             throw error(401, "Not authenticated");
//         }
//     }
//     else
//     {
//         throw error(401, "Not authenticated");
//     }
// };

//reworked version from gpt
import { error, type Handle, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';

const publicRoutes = ['/', '/login', '/register'];
const publicApiRoutes = ['/api/login', '/api/register'];

export const handle: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get('session');
    const path = event.url.pathname;

    let user = null;

    // 1. Authenticate once
    if (token) {
        const session = await prisma.session.findUnique({
            where: { token },
            include: { user: true }
        });

        if (session && session.expires > new Date()) {
            user = session.user;

            // optional refresh
            const newExpiry = new Date(Date.now() + 1000 * 60 * 60);

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
        } else if (session) {
            await prisma.session.delete({ where: { token } });
            event.cookies.delete('session', { path: '/' });
        }
    }

    event.locals.user = user;

    const isPublicPage = publicRoutes.includes(path);
    const isPublicApi = publicApiRoutes.includes(path);

    // 2. Redirect logged-in users away from login/register
    if (user && (path === '/login' || path === '/register')) {
        return new Response(null, {
            status: 302,
            headers: { location: '/home' }
        });
    }

    // 3. Block unauthenticated access to protected routes
    if (!user && !isPublicPage && !isPublicApi) {
        if (path.startsWith('/api')) {
            return new Response(
                JSON.stringify({ error: 'Not authenticated' }),
                { status: 401 }
            );
        }

        return new Response(null, {
            status: 302,
            headers: { location: '/login' }
        });
    }

    return resolve(event);
};