<script lang="ts">
    import ChevronLeftButton from "$lib/components/atoms/ChevronLeftButton.svelte";
    import ChevronRightButton from "$lib/components/atoms/ChevronRightButton.svelte";
    import {CalendarArrowDown, CalendarArrowUp} from 'lucide-svelte';
    import Calendar from "$lib/components/Calendar.svelte";
    import {goto} from "$app/navigation";
    import {changeDate, formatDateToUrl, parseDateFromUrl} from "$lib/utils";
    import { page } from '$app/state';
    let open: boolean = $state(false);

    function onClick(): void {
        open = !open;
    }

    function nextDate() {
        const date = new Date(parseDateFromUrl(page.url.searchParams.get('date')));
        changeDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1));
    }

    function prevDate() {
        const date = new Date(parseDateFromUrl(page.url.searchParams.get('date')));
        changeDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1));
    }

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
                {new Date(parseDateFromUrl(page.url.searchParams.get('date'))).toLocaleDateString('en-GB', {
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

