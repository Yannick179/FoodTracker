<script>
    export let value = 300;
    export let max = 4000;

    $: percent = Math.min((value / max) * 100, 100);
</script>

<!-- Bar background -->
<div class="w-full h-2.5 bg-fillEmpty rounded-full overflow-hidden">
    <!-- Fill -->
    <div
            class="h-full bg-brand transition-all duration-500"
            style="width: {percent}%"
    ></div>
</div>