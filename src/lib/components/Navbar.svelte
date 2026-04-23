<script>

    import {redirect} from "@sveltejs/kit";

    async function handleLogout() {
        // 1. Call logout endpoint (if using server session)

        const res = await fetch('/api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        console.log(res);
        console.log("logged out");


        // 3. Remove stored tokens (if using localStorage/sessionStorage)
        // localStorage.removeItem("token")

        // 4. Redirect user to login or home page
        // window.location.href = "/login"
    }
</script>

<nav class="w-full h-16 bg-zinc-900 shadow-sm flex items-center justify-between px-6">
    <!-- Left -->
    <div class="font-bold text-lg">
        Logo
    </div>

    <!-- Center -->
    <div class="hidden md:flex gap-6 ">
        <a href="/Home" class="hover:text-zinc-400">Home</a>
        <a href="/addFood" class="hover:text-zinc-400">new Food</a>
        <a href="/trackFood" class="hover:text-zinc-400">Tracker</a>
    </div>

    <!-- Right -->
    <div>
<!--        <a href="/login" class="inline-block px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">-->
<!--            Login-->
<!--        </a>-->
<!--        <a href="/register" class="inline-block px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">-->
<!--            Register-->
<!--        </a>-->
        <button type="button"
                class="cursor-pointer inline-block px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
                on:click={handleLogout}>
            Log out
        </button>
    </div>
</nav>