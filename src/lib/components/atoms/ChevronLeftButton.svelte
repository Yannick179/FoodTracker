<script lang="ts">
    import { ChevronLeft } from 'lucide-svelte';

    let {
        onClick
    }: {
        onClick: () => void;
    } = $props();
</script>


<button class="chevron-button" onclick={onClick}>
    <ChevronLeft size="1em"/>
</button>