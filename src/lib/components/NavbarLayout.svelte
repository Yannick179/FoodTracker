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

<nav class="w-full bg-navbar shadow-sm flex flex-col ">

    <!-- Row 1 -->
    <div class="flex items-center justify-between w-full px-6 pt-6">

        <!-- Left -->
        <div class="hidden md:flex gap-6">
            <a href="/home" class="hover:text-zinc-400 text-3xl font-extrabold">
                Logo
            </a>
        </div>

        <!-- Center -->
        <div class="hidden md:flex h-full gap-8">
        {#each routesAndNames as r}
            <div class="flex flex-col h-full">
                <a
                        href={r.route}
                        class={r.markActive
          ? "hover:text-brand font-semibold text-2xl text-brand"
          : "hover:text-brand font-semibold text-2xl"}
                >
                    {r.name}
                </a>

                <div class="mt-auto w-full flex justify-center">
                    <div class={r.markActive
          ? "rounded-2xl bg-brand h-[4px] w-[calc(100%-8px)]"
          : "w-full bg-navbar h-[4px]"}
                    ></div>
                </div>
            </div>
        {/each}
    </div>

        <!-- Right -->
        <div>
            <button
                    type="button"
                    class="cursor-pointer inline-block px-2 py-2 bg-red-700 text-lg text-white font-bold rounded-md hover:bg-red-600/70 transition"
                    on:click={handleLogout}
            >
                Log out
            </button>
        </div>

    </div>

    <!-- Row 2 (empty) -->
    <div class="w-full h-[1px] bg-line"></div>

</nav>