import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import React, { useEffect, useRef } from 'react'
import { ChartRenderer } from '../chartRenderer'

import { LineChartComponent } from '../charts/LineGraph'
import ColumnChart from "../charts/ColumnChart"
import { BarChartComponent } from '../charts/BarChart'
import { PieChartComponent } from '../charts/PieChart'
import { DonutChartComponent } from '../charts/DonutChart'
import { NumberStatCard } from '../charts/NumberStatCard'
import { CircleStatCard } from '../charts/CircleStatCard'

export const ChartLayoutNode = Node.create({
    name: 'chartLayout',
    group: 'block',
    content: 'heading* chartRenderer*',
    addAttributes() {
        return {
            variant: {
                default: 'chart-layout-1',
                parseHTML: element => element.getAttribute('variant') || 'chart-layout-1'
            },
            slideNumber: {
                default: null,
                parseHTML: (element: any) => element.getAttribute('slideNumber'),
                renderHTML: (attributes: any) => {
                    if (!attributes.slideNumber) {
                        return {}
                    }
                    return {
                        slideNumber: attributes.slideNumber
                    }
                }
            }
        }
    },
    parseHTML() {
        return [
            {
                tag: 'chart-layout',
                getAttrs: (node: any) => ({
                    variant: node.getAttribute('variant') || 'chart-layout-1',
                    slideNumber: node.getAttribute('slideNumber'),
                }),
            },
        ]
    },
    renderHTML({ HTMLAttributes }) {
        return [
            'chart-layout',
            {
                ...mergeAttributes(HTMLAttributes, {
                    'chart-layout': HTMLAttributes.variant || 'chart-layout-1',
                }),
            },
            0
        ]
    },
    addNodeView() {
        return ReactNodeViewRenderer(ChartLayoutNodeView)
    },
})

const ChartLayoutNodeView = (props: any) => {
    const { slideNumber, variant, ...rest } = props.node.attrs
    const wrapperRef = useRef<HTMLDivElement>(null);
    const variants = [
        { value: 'chart-layout-1', label: 'Chart Layout 1', icon: '⊞' },
    ]
    const changeVariant = (newVariant: string) => {
        if (newVariant !== variant) {
            let oldVariant = variant;
            props.updateAttributes({ variant: newVariant });
            // props.onVariantChange?.(newVariant, oldVariant, props.node.type.name, slideNumber)
        }
    }

    const getCurrentVariantIndex = () => {
        return variants.findIndex(v => v.value === variant) || 0;
    }
    const getNextVariant = () => {
        const currentIndex = getCurrentVariantIndex();
        const nextIndex = (currentIndex + 1) % variants.length;
        return variants[nextIndex];
    }

    useEffect(() => {
        if (wrapperRef.current) {
            // Find the parent .react-renderer.node-bulletList
            let parent = wrapperRef.current.parentElement;
            while (parent && !parent.classList.contains('node-chartLayout')) {
                parent = parent.parentElement;
            }
            if (parent) {
                parent.setAttribute('data-variant', variant);
                parent.classList.forEach(cls => {
                    if (cls.startsWith('variant-')) parent.classList.remove(cls);
                });
                parent.classList.add(`variant-${variant}`);
            }
        }
    }, [variant]);

    return (
        <NodeViewWrapper as="div" ref={wrapperRef} className="absolute w-full">
            <button
                className="bg-blue-500 absolute rights-0 top-[-20px] text-white px-3 py-1 text-sm cursor-pointer rounded-md hover:bg-blue-600 transition-colors z-10"
                onClick={() => {
                    const nextVariant = getNextVariant()
                    changeVariant(nextVariant.value)
                }}
                title={`Current: ${variant}, Click to switch`}
            >
                {variants.find(v => v.value === variant)?.label || variants[0].label}
            </button>
            {/* <ChartRenderer /> */}
        </NodeViewWrapper>
    )
}

export const ChartRendererNode = Node.create({
    name: 'chartRenderer',
    group: 'block',
    addAttributes() {
        return {
            chartType: {
                default: 'line',
                parseHTML: element => element.getAttribute('chartType') || 'line',
            },
            chartData: {
                default: [],
                parseHTML: element => {
                    const data = element.getAttribute('chartData');
                    try {
                        return data ? JSON.parse(data) : [];
                    } catch (e) {
                        console.warn('Invalid chartData JSON:', data);
                        return [];
                    }
                },
                renderHTML: attributes => ({
                    chartData: JSON.stringify(attributes.chartData || []),
                }),
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'chart-renderer',
                getAttrs: (node: any) => {
                    const chartType = node.getAttribute('chartType') || 'line'
                    const chartDataAttr = node.getAttribute('chartData') || '[]'
                    try {
                        console.log("chartDataAttr", chartDataAttr)
                        const chartData = JSON.parse(chartDataAttr)
                        return { chartType, chartData }
                    } catch (e) {
                        console.warn('Invalid JSON in chartData:', chartDataAttr)
                        return { chartType, chartData: [] }
                    }
                },
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'chart-renderer',
            mergeAttributes({
                chartType: HTMLAttributes.chartType,
                chartData: JSON.stringify(HTMLAttributes.chartData || []),
            }),
            0,
        ]
    },
    addNodeView() {
        return ReactNodeViewRenderer(ChartRendererNodeView)
    },
})

// EXAMPLE USAGE
{/* <BarChartComponent data={[{ name: 'Item A', value: 30 }, { name: 'Item B', value: 70 }]} />
<LineChartComponent data={[{ name: 'Jan', value: 50 }, { name: 'Feb', value: 90 }]} />
<PieChartComponent data={[{ name: 'Chrome', value: 60 }, { name: 'Firefox', value: 40 }]} />
<DonutChartComponent data={[{ name: 'Q1', value: 25 }, { name: 'Q2', value: 75 }]} />
<CircleStatCard label="Profile Completion" percentage={78} />
<NumberStatCard label="Total Users" value={1200} suffix="+" /> */}


const ChartRendererNodeView = (props: any) => {
    const { chartType, chartData, ...rest } = props.node.attrs
    const wrapperRef = useRef<HTMLDivElement>(null);
    console.log("chartData", chartData)
    console.log("chartType", chartType)

    return (
        <NodeViewWrapper as="div" ref={wrapperRef} className="w-full h-full">
            {/* {chartType === "line" && <LineChartComponent data={chartData} />}
            {chartType === "bar" && <BarChartComponent data={chartData} />}
            {chartType === "pie" && <PieChartComponent data={chartData} />}
            {chartType === "donut" && <DonutChartComponent data={chartData} />}
            {chartType === "number" && <NumberStatCard label={chartData.label} value={chartData.value} suffix={chartData.suffix} />}
            {chartType === "circle" && <CircleStatCard label={chartData.label} percentage={chartData.percentage} color={chartData.color} />}
            {chartType === "column" && <ColumnChart data={chartData} />} */}
        </NodeViewWrapper>
    )
}







