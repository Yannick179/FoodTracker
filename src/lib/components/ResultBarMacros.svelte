<script>
    export let value = 300;
    export let max = 4000;

    $: percent = Math.min((value / max) * 100, 100);
</script>

<div class="w-15 space-y-2">
    <!-- Bar background -->
    <div class="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <!-- Fill -->
        <div
                class="h-full bg-brand transition-all duration-500"
                style="width: {percent}%"
        ></div>
    </div>
</div>