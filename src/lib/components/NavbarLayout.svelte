<script>

    import {goto} from "$app/navigation";
    export let routesAndNames;

    async function handleLogout() {
        // 1. Call logout endpoint (if using server session)

        const res = await fetch('/api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        goto('/');
        console.log(res);
        console.log("logged out");

    }
</script>

<nav class="w-full bg-neutral-900  shadow-sm flex items-center justify-between p-8">
    <!-- Left -->
    <div class="hidden md:flex gap-6 ">
        <a href="/home" class="hover:text-zinc-400 text-3xl font-extrabold">Logo</a>
    </div>

    <!-- Center -->
    <div class="hidden md:flex gap-6">
        {#each routesAndNames as r}
            <a href={r.route} class="hover:text-zinc-400 font-semibold text-2xl">
                {r.name}
            </a>
        {/each}
    </div>

    <!-- Right -->
    <div>
        <button type="button"
                class="cursor-pointer inline-block px-2 py-2 bg-red-700 text-lg text-white font-bold rounded-md hover:bg-red-600/70 transition"
                on:click={handleLogout}>
            Log out
        </button>
    </div>
</nav>