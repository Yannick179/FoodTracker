<script>
    import NavbarLayout from "$lib/components/NavbarLayout.svelte";

    let routesAndNamesFood = [
        { name: "Dashboard", route: "/food/dashboard", markActive: false},
        { name: "New Food", route: "/food/addFood", markActive: false },
        { name: "Tracker", route: "/food/trackFood", markActive: false },
        { name: "Goals", route: "/food/goals", markActive: false },
        { name: "Recipes", route: "/food/recipes", markActive: false}
    ];

    import { page } from '$app/state';


    const routesWithActive = $derived(
        routesAndNamesFood.map(item => ({
            ...item,
            markActive: item.route === page.url.pathname
        }))
    );
</script>

<NavbarLayout routesAndNames={routesWithActive}></NavbarLayout>