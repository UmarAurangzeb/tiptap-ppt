'use client'

export function CircleStatCard({
    label,
    percentage,
    color = '#4f46e5',
}: {
    label: string
    percentage: number // 0 to 100
    color?: string
}) {
    const radius = 60
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (percentage / 100) * circumference

    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <svg width="150" height="150">
                <circle
                    cx="75"
                    cy="75"
                    r={radius}
                    stroke="#e5e7eb"
                    strokeWidth="12"
                    fill="transparent"
                />
                <circle
                    cx="75"
                    cy="75"
                    r={radius}
                    stroke={color}
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 75 75)"
                />
            </svg>
            <div className="text-center">
                <div className="text-xl font-semibold">{percentage}%</div>
                <div className="text-sm text-muted-foreground">{label}</div>
            </div>
        </div>
    )
}
