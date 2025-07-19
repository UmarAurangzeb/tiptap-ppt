'use client'

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

const COLORS = ['#3b82f6', '#facc15', '#ec4899', '#14b8a6']

export function DonutChartComponent({
    data,
}: {
    data: { name: string; value: number }[]
}) {
    return (
        <div className="rounded-2xl border p-4 shadow-md bg-white dark:bg-zinc-900">
            <h2 className="text-xl font-semibold mb-4">Donut Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={3}
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
