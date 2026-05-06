<script>
    import NavbarLayout from "$lib/components/NavbarLayout.svelte";

    const routesAndNamesFood = [
        { name: "Dashboard", route: "/food/dashboard" },
        { name: "New Food", route: "/food/addFood" },
        { name: "Tracker", route: "/food/trackFood" },
        { name: "Goals", route: "/food/goals" },
        { name: "Recipes", route: "food/recipes"}
    ];
</script>

<NavbarLayout routesAndNames={routesAndNamesFood}></NavbarLayout>