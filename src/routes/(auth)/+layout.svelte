<script lang="ts">
	let { children } = $props();

</script>



<div class="h-screen flex flex-col bg-background text-zinc-100 antialiased overflow-hidden">

	<main class="flex-1 min-h-0 overflow-y-auto [scrollbar-gutter:stable]">
		{@render children()}
	</main>

</div>


