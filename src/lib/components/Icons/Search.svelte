<svg
        class="neon-icon"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
>
    <defs>
        <filter id="glow-search" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>
    </defs>

    <!-- Background -->
    <circle
            cx="50"
            cy="50"
            r="38"
            fill="var(--icon-bg)"
            stroke="var(--icon-ring)"
            stroke-width="1.5"
    />

    <!-- Icon -->
    <g
            stroke="var(--icon-stroke)"
            stroke-width="var(--icon-stroke-width)"
            stroke-linecap="round"
            stroke-linejoin="round"
            filter="url(#glow-search)"
    >
        <circle cx="45" cy="45" r="12" />
        <line x1="54" y1="54" x2="66" y2="66" />
    </g>
</svg>