const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

/**
 * Reads `?limit=` from the URL and clamps it to a safe range so a client
 * can never request an unbounded number of rows.
 *
 * - missing / non-integer / < 1  -> `fallback`
 * - anything above MAX_LIMIT      -> MAX_LIMIT
 */
export function parseLimit(url: URL, fallback: number = DEFAULT_LIMIT): number {
    const raw = Number(url.searchParams.get('limit'));
    if (!Number.isInteger(raw) || raw < 1) {
        return Math.min(fallback, MAX_LIMIT);
    }
    return Math.min(raw, MAX_LIMIT);
}