<script lang="ts">
    import TrackingChart from "$lib/components/TrackingChart.svelte";
    import Calendar from "$lib/components/Calendar.svelte";
    import { createDate } from "$lib/dataStore.svelte";
    let hoverValue: number | null = 0;
    let hoverDate: string | null = "";

    const globalDate = createDate();
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
    const change = Math.trunc(start - current);


    function getDateNicelyFormatted(selectedDate: Date) {
        let formattedDate = selectedDate.getDate() + " " + convertNumberToMonth(selectedDate.getMonth()) + " " + selectedDate.getFullYear() ;
        return formattedDate;
    }

    function convertNumberToMonth(number: number) {
        switch (number) {
            case 0:
                return "January";
            case 1:
                return "February";
            case 2:
                return "March";
            case 3:
                return "April";
            case 4:
                return "May";
            case 5:
                return "June";
            case 6:
                return "July";
            case 7:
                return "August";
            case 8:
                return "September";
            case 9:
                return "October";
            case 10:
                return "November";
            case 11:
                return "December";
        }
    }

    function convertNumberToDay(number: number) {
        //starts with 0 as sunday and 1-6 for monday-saturday
        switch (number) {
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
            case 0:
                return "Sunday";
        }
    }
</script>




<div class="pt-8 pl-10 pr-10 flex flex-col gap-y-6">
    <div class="grid h-96 grid-cols-[4fr_13fr] gap-x-8 ">
        <div class="grid justify-items-center">
            <div class="mb-6 grid-rows-2">
                <div class="text-sm text-zinc-400 mb-1 flex">
                    {convertNumberToDay(globalDate.date.getDay())}
                </div>
                <div class="flex text-2xl font-semibold text-white tracking-tight tabular-nums">
                    {getDateNicelyFormatted(globalDate.date)}
                </div>
            </div>
            <div class="flex">
                <Calendar/>
            </div>
        </div>

        <div class="grid h-96 justify-items-center">
            <div class="text-xl font-semibold">
                {hoverValue ?? weights[weights.length - 1]?.value} kg
            </div>
            <TrackingChart entries={weights}
                           onHoverValue={(value, date) => {
            hoverValue = value;
            hoverDate = date;
            }}/>
        </div>

    </div>

    <div class="grid grid-cols-[4fr_13fr] gap-x-8 h-auto ">
        <div class="w-full">
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
        <div class="w-full flex flex-col gap-2 justify-items-center">
            <div class="p-3 font-bold text-lg">History</div>

            <div class="rounded-2xl border-2 border border-neutral-400">
                <div class="grid grid-cols-3 text-sm p-3 text-xl font-bold rounded-xl">
                    <span>Date</span>
                    <span>Weight</span>
                    <span>Difference</span>
                </div>
                <div class="overflow-y-auto h-80">
                    {#each weights.slice().reverse() as w}

                        <div class="grid grid-cols-3 text-sm p-3 rounded-xl">

                            <span>{w.date}</span>
                            <span>{w.value} kg</span>
                            <span>
                        {w.value - start > 0 ? "+" : ""}
                                {Math.trunc(w.value - start)} kg
                    </span>

                        </div>
                    {/each}
                </div>
            </div>

        </div>
    </div>
</div>

