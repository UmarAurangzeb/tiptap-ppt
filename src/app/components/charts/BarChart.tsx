'use client'

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

export function BarChartComponent({
    data,
}: {
    data: { name: string; value: number }[]
}) {
    return (
        <div className="rounded-2xl border p-4 shadow-md bg-white dark:bg-zinc-900">
            <h2 className="text-xl font-semibold mb-4">Bar Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#4f46e5" radius={[0, 8, 8, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
