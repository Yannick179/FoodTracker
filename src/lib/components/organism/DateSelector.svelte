<script lang="ts">
    import ChevronLeftButton from "$lib/components/atoms/ChevronLeftButton.svelte";
    import ChevronRightButton from "$lib/components/atoms/ChevronRightButton.svelte";
    import {CalendarArrowDown, CalendarArrowUp} from 'lucide-svelte';
    import Calendar from "$lib/components/Calendar.svelte";
    import {createDate} from "$lib/dataStore.svelte";
    let open: boolean = $state(false);

    function onClick(): void {
        open = !open;
    }

    function nextDate() {
        const d = new Date(globalDate.date);
        d.setDate(d.getDate() + 1);
        globalDate.update(new Date(d));
    }

    function prevDate() {
        const d = new Date(globalDate.date);
        d.setDate(d.getDate() - 1);
        globalDate.update(new Date(d));
    }

    const globalDate = createDate();
</script>

<div class="date-selector-wrapper">
    <div class="date-selector-button-grid">
        <ChevronLeftButton onClick={prevDate}/>
        <button class="date-selector-date-button" onclick={onClick}>
            {#if open}
                <CalendarArrowDown size="1em"/>
            {:else}
                <CalendarArrowUp size="1em"/>
            {/if}
            <span>
                {globalDate.date.toLocaleDateString('en-GB', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                })}
            </span>
        </button>
        <ChevronRightButton onClick={nextDate}/>
    </div>

    {#if open}
        <div class="date-selector-popover">
            <Calendar/>
        </div>
    {/if}
</div>

