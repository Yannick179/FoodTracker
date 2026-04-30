<script lang="ts">
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';

    let canvas: HTMLCanvasElement;
    type Entry = {
        date: string;
        value: number;
    };
    export let entries: Entry[] = [];

    onMount(() => {
        const ctx = canvas.getContext('2d');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: entries.map(w => w.date),
                datasets: [
                    {
                        label: 'Weight',
                        data: entries.map(w => w.value),
                        borderColor: 'white',
                        borderWidth: 2,
                        tension: 0.35,
                        pointRadius: 2,
                        pointBackgroundColor: 'white',
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: { display: false }
                },

                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: 'rgba(255,255,255,0.6)'
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255,255,255,0.08)',
                            lineWidth: 1
                        },
                        ticks: {
                            color: 'rgba(255,255,255,0.6)'
                        }
                    }
                }
            }
        });
    });
</script>


<canvas bind:this={canvas} class="w-full h-full"></canvas>
