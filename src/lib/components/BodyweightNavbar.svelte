<script>

    import NavbarLayout from "$lib/components/NavbarLayout.svelte";

    export let routesAndNamesBodyweight = [
        { name: "Dashboard", route: "/bodyweight/dashboard" },
        { name: "Weight", route: "/bodyweight/weight" },
        { name: "Goals", route: "/bodyweight/goals" },
        { name: "Settings", route: "/bodyweight/settings" }
    ];

</script>


<NavbarLayout routesAndNames={routesAndNamesBodyweight} />