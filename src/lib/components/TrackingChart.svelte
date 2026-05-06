<script lang="ts">
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';

    let canvas: HTMLCanvasElement;
    type Entry = {
        date: string;
        value: number;
    };
    export let entries: Entry[] = [];

    export let onHoverValue: (value: number | null, date: string | null) => void = () => {};

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
                        pointRadius: 1,
                        pointBackgroundColor: 'white',
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                onHover: (event, elements, chart) => {
                    if (elements.length) {
                        const i = elements[0].index;
                        const value = chart.data.datasets[0].data[i];
                        // const date = chart.data.datasets[0].date;
                        const date = entries[i].date;
                        console.log(date, value)
                        onHoverValue(value as number, date as string);
                    } else {
                    }
                },

                plugins: {
                    legend: { display: false },
                    tooltip: {
                        enabled: false
                    }
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
            },

            plugins: [
                {
                    id: 'hoverLine',
                    afterDraw(chart) {
                        const active = chart.tooltip?._active;
                        if (active && active.length) {
                            const ctx = chart.ctx;
                            const x = active[0].element.x;
                            const topY = chart.scales.y.top;
                            const bottomY = chart.scales.y.bottom;

                            ctx.save();
                            ctx.beginPath();
                            ctx.moveTo(x, topY);
                            ctx.lineTo(x, bottomY);
                            ctx.lineWidth = 1;
                            ctx.strokeStyle = '#666';
                            ctx.stroke();
                            ctx.restore();
                        }
                    }
                }
            ]
        });
    });
</script>

<canvas bind:this={canvas} class="w-full h-full rounded-2xl border-2 border border-neutral-400 p-2"></canvas>
