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
    <div class="flex items-center justify-between w-full px-6">

        <!-- Left -->
        <div class="hidden md:flex gap-6">
            <div class="grid h-20 grid-rows-[6px_1fr_6px] hover:text-zinc-400">
                    <!-- Top -->
                    <div></div>

                    <!-- Middle -->
                    <div class="flex items-center text-3xl font-extrabold">
                        <a href="/home" class="hover:text-zinc-400">
                            Logo
                        </a>
                    </div>

                     Bottom

                <div class=""></div>
            </div>
        </div>

        <!-- Center -->
        <div class="hidden md:flex h-full gap-8">
        {#each routesAndNames as r}
            <div class="grid h-20 grid-rows-[6px_1fr_6px] hover:text-zinc-400">
                <!-- Top -->
                <div></div>

                <!-- Middle -->
                <div class="flex items-center font-extrabold">
                    <a
                            href={r.route}
                            class={r.markActive ? "hover:text-brand font-semibold text-xl text-brand" : "hover:text-brand font-semibold text-xl"}>
                        {r.name}
                    </a>
                </div>

                <!-- Bottom-->
                <div class={r.markActive ? "bg-brand rounded-full" : ""}></div>

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