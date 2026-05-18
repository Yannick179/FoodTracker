import { redirect } from '@sveltejs/kit';
import { env } from "prisma/config";



export async function GET() {
    const params = new URLSearchParams({
        client_id: env("GOOGLE_CLIENT_ID"),
        redirect_uri: env("GOOGLE_REDIRECT_URI"),
        response_type: 'code',
        scope: [
            'openid',
            'email',
            'profile'
        ].join(' '),
        access_type: 'offline',
        prompt: 'consent'
    });

    throw redirect(
        302,
        `https://accounts.google.com/o/oauth2/v2/auth?${params}`
    );
}