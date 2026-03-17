<script lang="ts">
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

<!-- Header -->
<div class="flex justify-between items-center mb-2">
    <button on:click={prevMonth}>‹</button>
    <strong>
        {currentMonth.toLocaleString('default', { month: 'long' })}
        {currentMonth.getFullYear()}
    </strong>
    <button on:click={nextMonth}>›</button>
</div>

<!-- Weekdays -->
<div class="grid grid-cols-7 text-center text-sm text-gray-500 mb-1">
    <div>Su</div><div>Mo</div><div>Tu</div>
    <div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
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
