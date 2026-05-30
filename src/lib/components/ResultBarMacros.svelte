<script>
    export let value = 300;
    export let max = 4000;

    $: percent = Math.min((value / max) * 100, 100);
</script>

<!-- Bar background -->
<div class="w-full mb-1 h-2 bg-light-accent-darker1 rounded-full overflow-hidden">
    <!-- Fill -->
    <div
            class="h-full bg-red-accent transition-all duration-500"
            style="width: {percent}%"
    ></div>
</div>