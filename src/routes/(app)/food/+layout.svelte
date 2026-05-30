<script lang="ts">
	import FoodNavbar from "$lib/components/FoodNavbar.svelte";
	let { children } = $props();
</script>

<div class="">
	<header class="">
		<FoodNavbar />
	</header>
	<main class="app-main">
		{@render children()}
	</main>
</div>
