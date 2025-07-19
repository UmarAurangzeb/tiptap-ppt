'use client'

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

export function LineChartComponent({
    data,
}: {
    data: { name: string; value: number }[]
}) {
    return (
        <ResponsiveContainer width="100%" className='min-h-[200px]'>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#22c55e"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}
