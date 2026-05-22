<script>
    import { Bookmark } from 'lucide-svelte';

    let { size = 50 } = $props();
</script>

<div class="rounded-full border-[1px] border-brand/20 bg-brand/10 flex items-center justify-center" style="height: {size}px; width: {size}px;">
    <Bookmark class="text-brand" size={size * 0.5} />
</div>
