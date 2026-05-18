<script lang="ts">
	import WorkoutNavbar from "$lib/components/WorkoutNavbar.svelte";
	let { children } = $props();
</script>

<div class="h-screen flex flex-col overflow-hidden">
	<header class="shrink-0 text-zinc-100 bg-navbar antialiased">
		<WorkoutNavbar />
	</header>

	<main class="flex-1 min-h-0 overflow-y-auto [scrollbar-gutter:stable] text-zinc-100 bg-background">
		{@render children()}
	</main>
</div>
