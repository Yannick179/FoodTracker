import { error } from '@sveltejs/kit';

export function requireUser(locals: App.Locals) {
    if (!locals.user) {
        throw error(401, 'Not authenticated');
    }

    return locals.user;
}