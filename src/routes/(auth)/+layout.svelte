<script lang="ts">
	let { children } = $props();

</script>



<div class="min-h-screen bg-background text-zinc-100 antialiased">
<!--	<Navbar />-->

	<main class="text-zinc-100">
		{@render children()}
	</main>
</div>


