<script lang="ts">
    import '$lib/../app.css';

    import { createDate } from '$lib/dataStore.svelte';

    const globalDate = createDate();

    let currentMonth = $derived.by(() => {
        const d = globalDate.date;
        return new Date(d.getFullYear(), d.getMonth(), 1);
    });

    function daysInMonth(date: Date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }

    function firstDayOfMonth(date: Date) {
        // Monday = 0, Sunday = 6
        const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        return (day + 6) % 7;
    }

    function selectDay(day: number, isCurrentMonth: boolean) {
        console.log(day, isCurrentMonth);
        if (!isCurrentMonth) return;
        globalDate.update(new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day));
        console.log(globalDate.date);
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

    // Use $derived.by for complex logic calculation
    let daysGrid = $derived.by(() => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        const firstDayIndex = firstDayOfMonth(currentMonth);
        const daysInCurr = daysInMonth(currentMonth);

        const prevMonth = new Date(year, month - 1, 1);
        const daysInPrev = daysInMonth(prevMonth);

        const grid: { day: number; currentMonth: boolean }[] = [];

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

        return grid;
    });

</script>

<div class="bg-light-accent rounded-2xl overflow-hidden text-xl border-[2px] border-light-accent-darker1 date-selector-calendar">

    <!-- Header -->
    <div class="flex bg-blue-accent justify-between items-center px-2 py-1">
        <button on:click={prevMonth} class="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-800">
            <span class="transform -translate-y-[1px] -translate-x-[1px] text-light-accent">&lt;</span>
        </button>
        <strong class="text-light-accent">
            {currentMonth.toLocaleString("en-GB", { month: 'long' })}
            {currentMonth.getFullYear()}
        </strong>
        <button class="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-800">
            <span on:click={nextMonth} class="transform -translate-y-[1px] -translate-x-[-1px] text-light-accent">&gt;</span>
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
        cell.currentMonth
            ? (
                globalDate.date.getDate() === cell.day &&
                globalDate.date.getMonth() === currentMonth.getMonth() &&
                globalDate.date.getFullYear() === currentMonth.getFullYear()
            )
                ? 'cursor-pointer bg-blue-accent hover:bg-blue-accent text-background text-white'
                : 'cursor-pointer hover:bg-light-accent-darker1'
            : 'text-zinc-400 cursor-default'
    }`}
                    on:click={() => selectDay(cell.day, cell.currentMonth)}
                    disabled={!cell.currentMonth}
            >
                {cell.day}
            </button>
        {/each}
    </div>
</div>

