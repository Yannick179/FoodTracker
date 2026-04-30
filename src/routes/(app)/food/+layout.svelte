<script lang="ts">
	import FoodNavbar from "$lib/components/FoodNavbar.svelte";
	let { children } = $props();
</script>

<!--<div class="flex flex-col min-h-screen">-->
<!--	<header class="sticky top-0 bg-zinc-950 text-zinc-100 antialiased">-->
<!--		<Navbar />-->
<!--	</header>-->

<!--	<main class="text-zinc-100 bg-zinc-950 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">-->
<!--		{@render children()}-->
<!--	</main>-->
<!--</div>-->

<!--<script>-->
<!--	import "../app.css";-->
<!--</script>-->

<div class="h-screen flex flex-col overflow-hidden">
	<header class="shrink-0 text-zinc-100 bg-zinc-950 antialiased">
		<FoodNavbar />
	</header>

	<main class="flex-1 min-h-0 overflow-y-auto [scrollbar-gutter:stable] text-zinc-100 bg-zinc-950">
		{@render children()}
	</main>
</div>
