<script lang="ts">
    const apps = [
        {
            name: 'Food Tracker',
            description: 'Log meals, track calories, and visualize your nutrition.',
            icon: 'Logo',
            href: '/food/dashboard'
        },
        {
            name: 'Bodyweight Tracker',
            description: 'Monitor your weight progress over time with clean charts.',
            icon: 'Logo',
            href: '/bodyweight'
        },
        {
            name: 'Workout Tracker',
            description: 'Track your workout.',
            icon: 'Logo',
            href: '/workout/dashboard'
        },
        // {
        //     name: 'Gym Program Creator',
        //     description: 'Build and manage custom workout programs easily.',
        //     icon: '',
        //     href: '/gym'
        // }
    ];
</script>

<div class=" bg-neutral-900 text-white p-6 flex flex-col items-center overflow-y-auto [scrollbar-gutter:stable]">
    <div class="w-full max-w-6xl">

        <header class="mb-12 mt-8 text-center">
            <h1 class="text-4xl font-bold tracking-tight">Your Insert Name</h1>
            <p class="text-zinc-400 mt-2">Everything you need to track and improve your health</p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each apps as app}
                <a
                        href={app.href}
                        class="group block p-8 rounded-2xl border-2 border border-neutral-400 hover:bg-neutral-800 transition-all duration-200"
                >
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-4xl">{app.icon}</span>
                        <span class="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
                            Open →
                        </span>
                    </div>

                    <h2 class="text-xl font-semibold mb-2">
                        {app.name}
                    </h2>

                    <p class="text-sm text-zinc-400 leading-relaxed">
                        {app.description}
                    </p>
                </a>
            {/each}
        </div>

        <footer class="mt-20 mb-10 text-center text-zinc-600 text-sm tracking-wide">
            Build consistency. Track progress. Stay disciplined.
        </footer>
    </div>
</div>