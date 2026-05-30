<script lang="ts">
    import AppNavbar from "$lib/components/AppNavbar.svelte";

    let { children } = $props();
</script>


<div class="h-full flex flex-col overflow-hidden">
    <header class="shrink-0 text-zinc-100 bg-light-accent antialiased">
        <AppNavbar />
    </header>

    <main class="flex-1 min-h-0 overflow-y-auto [scrollbar-gutter:stable] text-zinc-100 font-bold bg-background">
        {@render children()}
    </main>
</div>
