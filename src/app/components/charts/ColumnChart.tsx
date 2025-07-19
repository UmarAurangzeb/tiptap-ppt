'use client'

import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts'

type Props = {
    data: { name: string; value: number }[]
}

export default function ColumnChart({ data }: Props) {
    return (
        <div className="rounded-2xl border p-4 shadow-md bg-white dark:bg-zinc-900">
            <h2 className="text-xl font-semibold mb-4">Column Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
