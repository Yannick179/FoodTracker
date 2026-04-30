<script lang="ts">
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
    import TrackingChart from "$lib/components/TrackingChart.svelte";

    let canvas: HTMLCanvasElement;

    let weights = [
        { date: "Apr 1", value: 83.4 },
        { date: "Apr 2", value: 83.2 },
        { date: "Apr 3", value: 83.5 },
        { date: "Apr 4", value: 83.1 },
        { date: "Apr 5", value: 82.9 },
        { date: "Apr 6", value: 83.0 },
        { date: "Apr 7", value: 82.7 },
        { date: "Apr 8", value: 82.6 },
        { date: "Apr 9", value: 82.8 },
        { date: "Apr 10", value: 82.4 },
        { date: "Apr 11", value: 82.3 },
        { date: "Apr 12", value: 82.5 },
        { date: "Apr 13", value: 82.1 },
        { date: "Apr 14", value: 82.0 },
        { date: "Apr 15", value: 81.9 },
        { date: "Apr 16", value: 82.2 },
        { date: "Apr 17", value: 81.8 },
        { date: "Apr 18", value: 81.7 },
        { date: "Apr 19", value: 81.6 },
        { date: "Apr 20", value: 81.9 },
        { date: "Apr 21", value: 81.5 },
        { date: "Apr 22", value: 81.3 },
        { date: "Apr 23", value: 82.0 },
        { date: "Apr 24", value: 81.8 },
        { date: "Apr 25", value: 81.5 },
        { date: "Apr 26", value: 81.6 },
        { date: "Apr 27", value: 81.2 },
        { date: "Apr 28", value: 81.0 },
        { date: "Apr 29", value: 80.8 },
        { date: "Apr 30", value: 80.6 },
        { date: "May 1", value: 80.7 },
        { date: "May 2", value: 80.4 },
        { date: "May 3", value: 80.2 },
        { date: "May 4", value: 80.5 },
        { date: "May 5", value: 80.1 },
        { date: "May 6", value: 79.9 },
        { date: "May 7", value: 79.8 },
        { date: "May 8", value: 79.6 },
        { date: "May 9", value: 79.7 },
        { date: "May 10", value: 79.5 }
    ];

    const current = weights.at(-1).value;
    const start = weights[0].value;
    const change = (start - current).toFixed(1);
</script>


<!--<div class="p-10 h-full flex justify-center">-->
<!--&lt;!&ndash;    <div class="h-1/3 w-4/5 ">&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;        <canvas bind:this={canvas} class="w-full h-full"></canvas>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;        <TrackingChart entries={weights} />&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--    <div class="min-h-screen flex justify-center p-6">-->

<!--        <div class="w-full max-w-3xl space-y-8">-->

<!--            &lt;!&ndash; Header &ndash;&gt;-->
<!--            <div>-->
<!--                <h1 class="text-3xl font-semibold">Weight Tracker</h1>-->
<!--                <p class="text-sm">Track your progress consistently</p>-->
<!--            </div>-->

<!--            &lt;!&ndash; Stats &ndash;&gt;-->
<!--            <div class="grid grid-cols-2 gap-4">-->

<!--                <div class="rounded-2xl p-4">-->
<!--                    <p class="text-sm">Current</p>-->
<!--                    <p class="text-2xl font-semibold">81.0 kg</p>-->
<!--                </div>-->

<!--                <div class="rounded-2xl p-4 text-right">-->
<!--                    <p class="text-sm">Change</p>-->
<!--                    <p class="text-2xl font-semibold">-1.0 kg</p>-->
<!--                </div>-->

<!--            </div>-->

<!--            &lt;!&ndash; Chart &ndash;&gt;-->
<!--            <div class="rounded-2xl p-6">-->
<!--                <h2 class="text-lg mb-4">Progress</h2>-->
<!--&lt;!&ndash;                <TrackingChart entries={weights} />&ndash;&gt;-->


<!--                <div class="w-full h-64">-->
<!--                    &lt;!&ndash; line chart goes here &ndash;&gt;-->
<!--                </div>-->
<!--            </div>-->

<!--            &lt;!&ndash; Quick add &ndash;&gt;-->
<!--            <div class="rounded-2xl p-6 flex gap-3 items-center">-->
<!--                <input-->
<!--                        type="number"-->
<!--                        placeholder="Enter weight (kg)"-->
<!--                        class="flex-1 p-3 rounded-xl"-->
<!--                />-->
<!--                <button class="px-4 py-3 rounded-xl">-->
<!--                    Add-->
<!--                </button>-->
<!--            </div>-->

<!--            &lt;!&ndash; Log &ndash;&gt;-->
<!--            <div class="rounded-2xl p-6 space-y-3">-->
<!--                <h2 class="text-lg">Recent entries</h2>-->

<!--                <div class="flex justify-between">-->
<!--                    <span>Apr 29</span>-->
<!--                    <span>80.8 kg</span>-->
<!--                </div>-->

<!--                <div class="flex justify-between">-->
<!--                    <span>Apr 28</span>-->
<!--                    <span>81.0 kg</span>-->
<!--                </div>-->

<!--            </div>-->

<!--        </div>-->

<!--    </div>-->
<!--</div>-->

<!--<script>-->
<!--    let weights = [-->
<!--        { date: "Apr 23", value: 82 },-->
<!--        { date: "Apr 24", value: 81.8 },-->
<!--        { date: "Apr 25", value: 81.5 },-->
<!--        { date: "Apr 26", value: 81.6 },-->
<!--        { date: "Apr 27", value: 81.2 },-->
<!--        { date: "Apr 28", value: 81.0 },-->
<!--        { date: "Apr 29", value: 80.8 }-->
<!--    ];-->

<!--    const current = weights.at(-1).value;-->
<!--    const start = weights[0].value;-->
<!--    const change = (start - current).toFixed(1);-->
<!--</script>-->

<div class="flex min-h-screen">

    <!-- Main -->
    <main class="flex-1 p-10 space-y-8">

        <!-- Top stats row -->
        <div class="grid grid-cols-3 gap-4">

            <div class="rounded-2xl p-4">
                <p class="text-sm">Current</p>
                <p class="text-2xl font-semibold">{current} kg</p>
            </div>

            <div class="rounded-2xl p-4">
                <p class="text-sm">Change</p>
                <p class="text-2xl font-semibold">{change} kg</p>
            </div>

            <div class="rounded-2xl p-4">
                <p class="text-sm">Entries</p>
                <p class="text-2xl font-semibold">{weights.length}</p>
            </div>

        </div>

        <!-- Chart section (wide) -->
        <div class="rounded-2xl p-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg">Progress</h2>
                <span class="text-sm">7 day view</span>
            </div>

            <div class="w-full h-72">
                <!-- chart goes here -->
            </div>
        </div>

        <!-- Input row -->
        <div class="rounded-2xl p-4 flex gap-3 items-center">
            <input
                    type="number"
                    placeholder="Enter weight"
                    class="flex-1 p-3 rounded-xl"
            />
            <button class="px-4 py-3 rounded-xl">
                Add
            </button>
        </div>

        <!-- Log table -->
        <div class="rounded-2xl p-6">

            <h2 class="text-lg mb-4">History</h2>

            <div class="space-y-2">

                {#each weights.slice().reverse() as w}
                    <div class="grid grid-cols-3 text-sm p-3 rounded-xl">

                        <span>{w.date}</span>
                        <span>{w.value} kg</span>
                        <span>
                            {w.value - start > 0 ? "+" : ""}
                            {(w.value - start).toFixed(1)} kg
                        </span>

                    </div>
                {/each}

            </div>

        </div>

    </main>

</div>
