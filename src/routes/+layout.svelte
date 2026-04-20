<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from "$lib/components/Navbar.svelte";
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


<div class="min-h-screen bg-zinc-800 text-zinc-100 antialiased">
	<Navbar />

	<main class="text-zinc-100">
		{@render children()}
	</main>
</div>
