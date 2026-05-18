import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import {env} from "prisma/config";
import {prisma} from "$lib/prisma";
import {createSession} from "../../sessionCreater";
import {dev} from "$app/environment";

const client = new OAuth2Client(
    env("GOOGLE_CLIENT_ID"),
    env("GOOGLE_CLIENT_SECRET"),
    env("GOOGLE_REDIRECT_URI")
);

export async function GET({ url, cookies }) {
    const code = url.searchParams.get('code');

    if (!code) {
        return new Response('Missing code', { status: 400 });
    }

    const { tokens } = await client.getToken(code);

    client.setCredentials(tokens);

    const ticket = await client.verifyIdToken({
        idToken: tokens.id_token!,
        audience: env("GOOGLE_CLIENT_ID")
    });

    const payload = ticket.getPayload();

    if (!payload) {
        return new Response('Invalid token', { status: 401 });
    }

    const googleUser = {
        googleId: payload.sub,
        email: payload.email,
        // name: payload.name,
        // picture: payload.picture
    };

    if(googleUser) {
        // @ts-ignore
        //look if user exists in db
        let user = await prisma.user.findUnique({
            where: { googleId: googleUser.googleId }
        });

        if (!user) {
            //if doesnt exists check if the email exists already
            user = await prisma.user.findUnique({
                where: { email: googleUser.email! }
            });

            if (user) {

                // link Google to existing account
                user = await prisma.user.update({
                    where: { id: user.id },
                    data: { googleId: googleUser.googleId }
                });
            } else {
                // create new user
                user = await prisma.user.create({
                    data: {
                        email: googleUser.email!.toLowerCase().trim(),
                        googleId: googleUser.googleId
                    }
                });
            }
        }

        const token = await createSession(user.id);
        cookies.set('session', token, {
            httpOnly: true,
            path: '/',
            sameSite: 'lax',
            secure: !dev,
            maxAge: 60 * 60
        });

        // return Response.redirect('/home');
        throw redirect(302, '/home');
    }
}