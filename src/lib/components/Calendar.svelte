<script lang="ts">
    import '$lib/../app.css';

    export let selectedDate: Date = new Date();

    let currentMonth = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        1
    );

    function daysInMonth(date: Date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }

    function firstDayOfMonth(date: Date) {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    }

    function selectDay(day: number) {
        selectedDate = new Date(
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

    $: days = Array.from(
        { length: daysInMonth(currentMonth) },
        (_, i) => i + 1
    );

    $: offset = firstDayOfMonth(currentMonth);
</script>

<div class="border max-w-xs mx-auto">

    <!-- Header -->
    <div class="flex justify-between items-center mb-2">
        <button on:click={prevMonth} class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200">
            <span class="transform -translate-y-[1px] -translate-x-[1px]">&lt;</span>
        </button>
        <strong>
            {currentMonth.toLocaleString('default', { month: 'long' })}
            {currentMonth.getFullYear()}
        </strong>
        <button class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200">
            <span on:click={nextMonth} class="transform -translate-y-[1px] -translate-x-[1px]">&gt;</span>
        </button>
    </div>
    <!-- weekdays -->
    <div class="grid grid-cols-7 gap-2 ">
        <div class="p-2">Mon</div>
        <div class="p-2">Tue</div>
        <div class="p-2">Wed</div>
        <div class="p-2">Thu</div>
        <div class="p-2">Fri</div>
        <div class="p-2">Sat</div>
        <div class="p-2">Sun</div>
    </div>
    <!-- Days -->
    <div class="grid grid-cols-7 gap-1">
        {#each Array(offset) as _}
            <div></div>
        {/each}

        {#each days as day}
            <button
                    class="p-2 rounded hover:bg-blue-100
            {selectedDate.getDate() === day &&
             selectedDate.getMonth() === currentMonth.getMonth() &&
             selectedDate.getFullYear() === currentMonth.getFullYear()
              ? 'bg-blue-500 text-white'
              : ''}"
                    on:click={() => selectDay(day)}
            >
                {day}
            </button>
        {/each}
    </div>
</div>

