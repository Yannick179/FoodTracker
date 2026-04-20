<script lang="ts">
    import '$lib/../app.css';

    import { globalDate } from '$lib/dataStore.svelte';


    let currentMonth = new Date(
        globalDate.val.getFullYear(),
        globalDate.val.getMonth(),
        1
    );

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

        globalDate.val = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day
        );
    }

    function prevMonth() {
        currentMonth = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth() - 1,
            1
        );
    }

    function nextMonth() {
        currentMonth = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth() + 1,
            1
        );
    }

    const TOTAL_CELLS = 42;

    $: {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        const firstDayIndex = firstDayOfMonth(currentMonth);
        const daysInCurr = daysInMonth(currentMonth);

        const prevMonth = new Date(year, month - 1, 1);
        const daysInPrev = daysInMonth(prevMonth);

        const grid = [];

        // Previous month filler
        for (let i = firstDayIndex - 1; i >= 0; i--) {
            grid.push({
                day: daysInPrev - i,
                currentMonth: false
            });
        }

        // Current month
        for (let d = 1; d <= daysInCurr; d++) {
            grid.push({
                day: d,
                currentMonth: true
            });
        }

        // Next month filler
        let nextDay = 1;
        while (grid.length < TOTAL_CELLS) {
            grid.push({
                day: nextDay++,
                currentMonth: false
            });
        }

        daysGrid = grid;
    }

    let daysGrid: { day: number; currentMonth: boolean }[] = [];
</script>

<div class="p-2 bg-zinc-900 rounded-2xl max-w-xs ">

    <!-- Header -->
    <div class="flex justify-between items-center mb-1">
        <button on:click={prevMonth} class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-800">
            <span class="transform -translate-y-[1px] -translate-x-[1px]">&lt;</span>
        </button>
        <strong>
            {currentMonth.toLocaleString('default', { month: 'long' })}
            {currentMonth.getFullYear()}
        </strong>
        <button class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-800">
            <span on:click={nextMonth} class="transform -translate-y-[1px] -translate-x-[-1px]">&gt;</span>
        </button>
    </div>
    <!-- weekdays -->
    <div class="grid grid-cols-7 gap-0.5 ">
        <div class="p-1 font-mono w-10 text-center">Mon</div>
        <div class="p-1 font-mono w-10 text-center">Tue</div>
        <div class="p-1 font-mono w-10 text-center">Wed</div>
        <div class="p-1 font-mono w-10 text-center">Thu</div>
        <div class="p-1 font-mono w-10 text-center">Fri</div>
        <div class="p-1 font-mono w-10 text-center">Sat</div>
        <div class="p-1 font-mono w-10 text-center">Sun</div>
    </div>
    <!-- Days -->
    <div class="grid grid-cols-7 gap-0.5">
        {#each daysGrid as cell}
            <button
                    class="p-1 rounded-xl text-center font-mono w-10
            {cell.currentMonth ? 'hover:bg-zinc-800' : 'text-zinc-600 cursor-default'}
            {cell.currentMonth &&
             globalDate.val.getDate() === cell.day &&
             globalDate.val.getMonth() === currentMonth.getMonth() &&
             globalDate.val.getFullYear() === currentMonth.getFullYear()
              ? 'bg-blue-500 text-white'
              : ''}"
                    on:click={() => selectDay(cell.day, cell.currentMonth)}
                    disabled={!cell.currentMonth}
            >
                {cell.day}
            </button>
        {/each}
    </div>
</div>

