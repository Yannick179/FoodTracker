<script>

    import {redirect} from "@sveltejs/kit";
    import {goto} from "$app/navigation";
    import NavbarLayout from "$lib/components/NavbarLayout.svelte";

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

<!--<nav class="w-full bg-neutral-900 text-3xl shadow-sm flex items-center justify-between p-8">-->
<!--    &lt;!&ndash; Left &ndash;&gt;-->
<!--    <div class="hidden md:flex gap-6 ">-->
<!--        <a href="/home" class="hover:text-zinc-400">Logo</a>-->
<!--    </div>-->

<!--    &lt;!&ndash; Center &ndash;&gt;-->
<!--    <div class="hidden md:flex gap-6 ">-->
<!--&lt;!&ndash;        <a href="/food/home" class="hover:text-zinc-400">Home</a>&ndash;&gt;-->
<!--        &lt;!&ndash;        <a href="/food/addFood" class="hover:text-zinc-400">new Food</a>&ndash;&gt;-->
<!--        &lt;!&ndash;        <a href="/food/trackFood" class="hover:text-zinc-400">Tracker</a>&ndash;&gt;-->
<!--        &lt;!&ndash;        <a href="/food/stats" class="hover:text-zinc-400">Stats</a>&ndash;&gt;-->

<!--    </div>-->

<!--    &lt;!&ndash; Right &ndash;&gt;-->
<!--    <div>-->
<!--        <button type="button"-->
<!--                class="cursor-pointer inline-block px-2 py-2 bg-red-700 text-lg text-white font-bold rounded-md hover:bg-red-600/70 transition"-->
<!--                on:click={handleLogout}>-->
<!--            Log out-->
<!--        </button>-->
<!--    </div>-->
<!--</nav>-->

<NavbarLayout routesAndNames={[]} />