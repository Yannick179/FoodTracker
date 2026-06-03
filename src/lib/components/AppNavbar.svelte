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


<NavbarLayout routesAndNames={[]} />