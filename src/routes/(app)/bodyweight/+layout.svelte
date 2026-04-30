<script lang="ts">
	import BodyweightNavbar from "$lib/components/BodyweightNavbar.svelte";
	let { children } = $props();
</script>


<div class="h-full flex flex-col overflow-hidden">
	<header class="shrink-0 text-zinc-100 bg-zinc-950 antialiased">
		<BodyweightNavbar />
	</header>

	<main class="flex-1 min-h-0 overflow-y-auto [scrollbar-gutter:stable] text-zinc-100 bg-zinc-950">
<!--	<main class="h-full flex-1 min-h-0 text-zinc-100 bg-zinc-950">-->
	{@render children()}
	</main>
</div>
