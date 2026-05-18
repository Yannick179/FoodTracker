<script>
    //default values
    export let value = 300;
    export let max = 4000;

    // % consumed
    $: percent = Math.min((value / max) * 100, 100);

    // % remaining
    $: remainingPercent = 100 - percent;

    const radius = 45;
    const circumference = 2 * Math.PI * radius;

    // controls how much of the gray ring is visible
    $: strokeDashoffset =
        (percent / 100) * circumference;
</script>

<div class="flex flex-col items-center justify-center place-items-center">
    <div class="relative w-32 h-32">
        <svg class="w-full h-full transform -rotate-180">
            <!-- FULL background (blue) -->
            <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    stroke="currentColor"
                    stroke-width="10"
                    fill="transparent"
                    class="text-brand"
            />

            <!-- remaining (shrinks like a clock but anticlockwise) -->
            <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    stroke="currentColor"
                    stroke-width="10"
                    fill="transparent"
                    stroke-dasharray={circumference}
                    stroke-dashoffset={strokeDashoffset}
                    class=" transition-all duration-700  transform -rotate-90 scale-x-[-1]"
            />
        </svg>

        <!-- center text -->
        <div class="absolute inset-0 flex flex-col items-center justify-center">
            <div class="">
                {percent.toFixed(1)}%

            </div>
        </div>
    </div>

    <div class="text-sm">
    </div>
</div>