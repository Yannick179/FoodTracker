<script>

    import {redirect} from "@sveltejs/kit";
    import {goto} from "$app/navigation";

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

<nav class="w-full h-16 bg-zinc-900 shadow-sm flex items-center justify-between px-6">
    <!-- Left -->
    <div class="hidden md:flex gap-6 font-bold text-lg ">
        <a href="/home" class="hover:text-zinc-400">Logo</a>
    </div>

    <!-- Center -->
    <div class="hidden md:flex gap-6 ">
        <a href="/bodyweight/dashboard" class="hover:text-zinc-400">Dashboard</a>
<!--        <a href="/food/addFood" class="hover:text-zinc-400">new Food</a>-->
<!--        <a href="/food/trackFood" class="hover:text-zinc-400">Tracker</a>-->
<!--        <a href="/food/stats" class="hover:text-zinc-400">Stats</a>-->
        <a href="/bodyweight/weight" class="hover:text-zinc-400">Weight</a>
        <a href="/bodyweight/goals" class="hover:text-zinc-400">Goals</a>
        <a href="/bodyweight/settings" class="hover:text-zinc-400">Settings</a>
    </div>

    <!-- Right -->
    <div>
        <button type="button"
                class="cursor-pointer inline-block px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
                on:click={handleLogout}>
            Log out
        </button>
    </div>
</nav>