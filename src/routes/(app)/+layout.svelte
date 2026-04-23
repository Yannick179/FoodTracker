<script lang="ts">
	import Navbar from "$lib/components/Navbar.svelte";
	let { children } = $props();
</script>




<div class="min-h-screen bg-zinc-800 text-zinc-100 antialiased">
	<Navbar />

	<main class="text-zinc-100">
		{@render children()}
	</main>
</div>
