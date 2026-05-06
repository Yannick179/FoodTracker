<script lang="ts">
    import '$lib/../app.css';

    import { createDate } from '$lib/dataStore.svelte';

    const globalDate = createDate();

    let currentMonth = $state(new Date(
        globalDate.date.getFullYear(),
        globalDate.date.getMonth(),
        1
    ));

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

    // $: {
    //     const year = currentMonth.getFullYear();
    //     const month = currentMonth.getMonth();
    //
    //     const firstDayIndex = firstDayOfMonth(currentMonth);
    //     const daysInCurr = daysInMonth(currentMonth);
    //
    //     const prevMonth = new Date(year, month - 1, 1);
    //     const daysInPrev = daysInMonth(prevMonth);
    //
    //     const grid = [];
    //
    //     // Previous month filler
    //     for (let i = firstDayIndex - 1; i >= 0; i--) {
    //         grid.push({
    //             day: daysInPrev - i,
    //             currentMonth: false
    //         });
    //     }
    //
    //     // Current month
    //     for (let d = 1; d <= daysInCurr; d++) {
    //         grid.push({
    //             day: d,
    //             currentMonth: true
    //         });
    //     }
    //
    //     // Next month filler
    //     let nextDay = 1;
    //     while (grid.length < TOTAL_CELLS) {
    //         grid.push({
    //             day: nextDay++,
    //             currentMonth: false
    //         });
    //     }
    //
    //     daysGrid = grid;
    // }
    // let daysGrid: { day: number; currentMonth: boolean }[] = $state([]);

    // Assuming currentMonth is state (e.g., from a prop or local state)
    // let currentMonth = $state(new Date());

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

<div class="p-2 rounded-2xl border-2 border border-neutral-400 max-w-xs ">

    <!-- Header -->
    <div class="flex justify-between items-center mb-1">
        <button on:click={prevMonth} class="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-800">
            <span class="transform -translate-y-[1px] -translate-x-[1px]">&lt;</span>
        </button>
        <strong>
            {currentMonth.toLocaleString('default', { month: 'long' })}
            {currentMonth.getFullYear()}
        </strong>
        <button class="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-800">
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
                    class="cursor-pointer p-1 rounded-xl text-center font-mono w-10
            {cell.currentMonth ? 'hover:bg-neutral-800' : 'text-zinc-600 cursor-default'}
            {cell.currentMonth &&
             globalDate.date.getDate() === cell.day &&
             globalDate.date.getMonth() === currentMonth.getMonth() &&
             globalDate.date.getFullYear() === currentMonth.getFullYear()
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

