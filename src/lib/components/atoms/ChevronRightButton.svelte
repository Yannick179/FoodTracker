<script lang="ts">
    import { ChevronRight } from 'lucide-svelte';

    let {
        onClick
    }: {
        onClick: () => void;
    } = $props();
</script>


<button class="chevron-button" onclick={onClick}>
    <ChevronRight size="1em"/>
</button>