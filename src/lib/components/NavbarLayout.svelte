<script>
    import { LogOut } from 'lucide-svelte';
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

<nav class="app-navbar">

    <!-- Row 1 -->
    <div class="flex items-center h-full justify-between w-full px-6">

        <!-- Left -->
        <div class="hidden h-full md:flex gap-6">
            <div class="grid h-full grid-rows-[6px_1fr_6px]">
                    <!-- Top -->
                    <div></div>

                    <!-- Middle -->
                    <div class="flex items-center text-2xl text-orange-accent font-extrabold">
                        <a href="/home" class="hover:text-zinc-400">
                            Logo
                        </a>
                    </div>


                <div class=""></div>
            </div>
        </div>

        <!-- Center -->
        <div class="hidden md:flex h-full gap-8">
        {#each routesAndNames as r}
            <div class="grid h-full grid-rows-[6px_1fr_6px]">
                <!-- Top -->
                <div></div>

                <!-- Middle -->
                <div class="flex items-center font-sans">
                    <a
                            href={r.route}
                            class={r.markActive ? "hover:text-red-accent font-semibold text-xl text-red-accent" : "hover:text-red-accent text-dark-accent font-semibold text-xl"}>
                        {r.name}
                    </a>
                </div>

                <!-- Bottom-->
                <div class={r.markActive ? "bg-red-accent rounded-full" : ""}></div>

            </div>
        {/each}
    </div>

        <!-- Right -->
        <div>
            <button
                    type="button"
                    class="cursor-pointer grid grid-cols-[auto_1fr] gap-2 px-2 py-2 items-center place-items-center bg-dark-accent text-lg text-white font-bold rounded-md hover:bg-background"
                    on:click={handleLogout}
            >
                Log out
                <LogOut size="18"/>
            </button>
        </div>

    </div>

</nav>