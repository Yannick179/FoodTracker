<script>
    import NavbarLayout from "$lib/components/NavbarLayout.svelte";

    let routesAndNamesFood = [
        { name: "Dashboard", route: "/calorie-tracker/dashboard", markActive: false},
        { name: "New Food", route: "/calorie-tracker/addFood", markActive: false },
        // { name: "Tracker", route: "/food/trackFood", markActive: false },
        { name: "Goals", route: "/calorie-tracker/goals", markActive: false },
        { name: "Meals", route: "/calorie-tracker/meals", markActive: false}
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