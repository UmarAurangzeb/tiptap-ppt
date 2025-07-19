'use client'

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

const COLORS = ['#6366f1', '#f97316', '#10b981', '#ef4444']

export function PieChartComponent({
    data,
}: {
    data: { name: string; value: number }[]
}) {
    return (
        <div className="rounded-2xl border p-4 shadow-md bg-white dark:bg-zinc-900">
            <h2 className="text-xl font-semibold mb-4">Pie Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
