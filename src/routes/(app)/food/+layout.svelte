<script lang="ts">
	import FoodNavbar from "$lib/components/FoodNavbar.svelte";
	let { children } = $props();
</script>

<div class="h-screen flex flex-col overflow-hidden">
	<header class="shrink-0 text-brand-text-white bg-navbar antialiased">
		<FoodNavbar />
	</header>

	<main class="flex-1 min-h-0 overflow-y-auto [scrollbar-gutter:stable] text-brand-text-white bg-background">
		{@render children()}
	</main>
</div>
