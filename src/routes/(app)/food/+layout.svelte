<script lang="ts">
	import FoodNavbar from "$lib/components/FoodNavbar.svelte";
	let { children } = $props();
</script>

<div class="h-screen flex flex-col overflow-hidden">
	<header class="shrink-0 text-zinc-100 bg-neutral-900 antialiased">
		<FoodNavbar />
	</header>

	<main class="flex-1 min-h-0 overflow-y-auto [scrollbar-gutter:stable] text-zinc-100 bg-neutral-900">
		{@render children()}
	</main>
</div>
