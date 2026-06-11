<script lang="ts">
    import '$lib/../app.css';
    import { page } from '$app/state';
    import {changeDate, parseDateFromUrl} from "$lib/utils";

    function startOfMonth(date: Date) {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }

    // The currently selected day, taken from the URL — used only for highlighting.
    let selectedDate = $derived(new Date(parseDateFromUrl(page.url.searchParams.get('date'))));

    // The month shown in the grid. View-only state, decoupled from the selection so
    // paging months does NOT change the selected date.
    let viewMonth = $state(startOfMonth(new Date(parseDateFromUrl(page.url.searchParams.get('date')))));

    // If the selected date changes elsewhere (chevrons, direct URL), jump the view to it.
    $effect(() => {
        viewMonth = startOfMonth(selectedDate);
    });

    function compareDateAndCell(month: Date, day: number) {
        return selectedDate.getDate() === day &&
            selectedDate.getMonth() === month.getMonth() &&
            selectedDate.getFullYear() === month.getFullYear();
    }

    function daysInMonth(date: Date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }

    function firstDayOfMonth(date: Date) {
        // Monday = 0, Sunday = 6
        const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        return (day + 6) % 7;
    }

    function selectDay(day: number, isCurrentMonth: boolean) {
        if (!isCurrentMonth) return;
        changeDate(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day));
    }

    function prevMonth() {
        viewMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1);
    }

    function nextMonth() {
        viewMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1);
    }

    const TOTAL_CELLS = 42;

    // Use $derived.by for complex logic calculation
    let daysGrid = $derived.by(() => {
        const year = viewMonth.getFullYear();
        const month = viewMonth.getMonth();

        const firstDayIndex = firstDayOfMonth(viewMonth);
        const daysInCurr = daysInMonth(viewMonth);

        const prevMonth = new Date(year, month - 1, 1);
        const daysInPrev = daysInMonth(prevMonth);

        const grid: { day: number; viewMonth: boolean }[] = [];

        // Previous month filler
        for (let i = firstDayIndex - 1; i >= 0; i--) {
            grid.push({
                day: daysInPrev - i,
                viewMonth: false
            });
        }

        // Current month
        for (let d = 1; d <= daysInCurr; d++) {
            grid.push({
                day: d,
                viewMonth: true
            });
        }

        // Next month filler
        let nextDay = 1;
        while (grid.length < TOTAL_CELLS) {
            grid.push({
                day: nextDay++,
                viewMonth: false
            });
        }

        return grid;
    });

</script>

<div class="bg-light-accent rounded-2xl overflow-hidden text-xl border-[2px] border-light-accent-darker1 date-selector-calendar">

    <!-- Header -->
    <div class="flex bg-blue-accent justify-between items-center px-2 py-1">
        <button onclick={prevMonth} class="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-800">
            <span class="transform -translate-y-[1px] -translate-x-[1px] text-light-accent">&lt;</span>
        </button>
        <strong class="text-light-accent">
            {viewMonth.toLocaleString("en-GB", { month: 'long' })}
            {viewMonth.getFullYear()}
        </strong>
        <button class="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-800">
            <span onclick={nextMonth} class="transform -translate-y-[1px] -translate-x-[-1px] text-light-accent">&gt;</span>
        </button>
    </div>
    <!-- weekdays -->
    <div class="grid grid-cols-7 text-base mx-2 pt-2">
        <span  class=" font-mono w-8 text-center">Mon</span>
        <span  class=" font-mono w-8 text-center">Tue</span>
        <span class=" font-mono w-8 text-center">Wed</span>
        <span class=" font-mono w-8 text-center">Thu</span>
        <span class=" font-mono w-8 text-center">Fri</span>
        <span class=" font-mono w-8 text-center">Sat</span>
        <span class=" font-mono w-8 text-center">Sun</span>
    </div>

    <!-- Days -->
    <div class="grid grid-cols-7 mb-2 mx-2 text-base">
        {#each daysGrid as cell}
            <button
                    class={`py-0.5 rounded-xl text-center font-mono w-8
    ${
        cell.viewMonth
            ? (compareDateAndCell(viewMonth, cell.day)

            )
                ? 'cursor-pointer bg-blue-accent hover:bg-blue-accent text-background text-white'
                : 'cursor-pointer hover:bg-light-accent-darker1'
            : 'text-zinc-400 cursor-default'
    }`}
                    onclick={() => selectDay(cell.day, cell.viewMonth)}
                    disabled={!cell.viewMonth}
            >
                {cell.day}
            </button>
        {/each}
    </div>
</div>

