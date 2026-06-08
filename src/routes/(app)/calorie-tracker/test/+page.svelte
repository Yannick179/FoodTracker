<script>
    import DateSelector from "$lib/components/organism/DateSelector.svelte";
    import Card from "$lib/components/organism/Card.svelte";
    import PrimaryButton from "$lib/components/atoms/PrimaryButton.svelte";
    import Modal from "$lib/components/organism/Modal.svelte";
    import Header from "$lib/components/atoms/Header.svelte";
    import {LogOut} from "lucide-svelte";
    import SearchInput from "$lib/components/atoms/SearchInput.svelte";
    import ListItemButton from "$lib/components/atoms/ListItemButton.svelte";
    import NumberInput from "$lib/components/atoms/NumberInput.svelte";
    import Subheading from "$lib/components/atoms/Subheading.svelte";
</script>

<div class="items-center place-items-center pl-10">
    <DateSelector/>
    <Card>
        <PrimaryButton onclick={() => {}}>Submit</PrimaryButton>
    </Card>
</div>

<DateSelector/>

<!--<Modal>-->
<!--    <span>text</span>-->
<!--    <div class="h-[400px] w-[400px]">wefw</div>-->
<!--</Modal>-->
<Header text="Nutrition Overview" />
<Subheading text="Nutrition per 100g" />
<!--<PrimaryButton>-->
<!--    Log out-->
<!--    <LogOut size="18"/>-->
<!--</PrimaryButton>-->


<SearchInput placeholder="hallo" value="" />
<ListItemButton name="Banana" amount={100} protein={5} carbohydrates={5} fats={5} calories={5} />

<NumberInput value="32"/>