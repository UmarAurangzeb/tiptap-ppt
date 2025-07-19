'use client'

export function NumberStatCard({
    label,
    value,
    suffix,
}: {
    label: string
    value: number | string
    suffix?: string
}) {
    return (
        <div className="rounded-2xl border p-4 shadow-md bg-white dark:bg-zinc-900">
            <div className="text-sm text-muted-foreground">{label}</div>
            <div className="text-3xl font-bold mt-2">
                {value}
                {suffix && <span className="text-lg font-normal ml-1">{suffix}</span>}
            </div>
        </div>
    )
}
