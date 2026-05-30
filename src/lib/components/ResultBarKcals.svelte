<script>
    export let value = 300;
    export let max = 4000;

    $: percent = Math.min((value / max) * 100, 100);

    const radius = 45;
    const circumference = 2 * Math.PI * radius;

    // correct progress calculation
    $: offset = circumference * (1 - percent / 100);
</script>

<div class="flex items-center justify-center">

    <div class="relative w-48 h-48">

        <svg viewBox="0 0 128 128" class="w-full h-full">

            <!-- background -->
            <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    fill="none"
                    stroke-width="9"
                    class="stroke-light-accent-darker1"
            />

            <!-- progress -->
            <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    fill="none"
                    stroke-width="9"
                    stroke-linecap="round"
                    stroke-dasharray={circumference}
                    stroke-dashoffset={offset}
                    class="stroke-red-accent"
                    transform="rotate(-90 64 64)"
            />

        </svg>

        <!-- center text -->
        <div class="absolute inset-0 flex flex-col items-center justify-center ">
            <div class="text-4xl font-bold">
                {percent.toFixed(0)}%
            </div>
            <div class="text-sm text-zinc-400">
                of calorie goal
            </div>
        </div>

    </div>

</div>