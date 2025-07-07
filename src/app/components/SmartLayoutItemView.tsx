"use client"
import React from 'react'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import { useElementTracking } from '@/hooks/useElementTracking'
import { getResponsiveValue } from '@/utils/responsive'

export default function SmartLayoutItemView({ editor, node, getPos }: { editor: any, node: any, getPos: any }) {
    const { ref, elementId, parentContainerWidth } = useElementTracking({
        elementType: 'shape',
        node,
        getElementData: (elementId, slideNumber, coordinates) => ({
            content: '', // Shapes don't have text content
            shapeType: 'roundedRectangle',
            fillColor: 'FFFFFF', // White background
            borderColor: 'D1D5DB', // Gray-300 border
            borderWidth: 1,
            cornerRadius: getResponsiveValue(8, parentContainerWidth) // Responsive corner radius
        })
    })

    const selectShape = () => {
        const from = getPos()
        console.log("getting starting position", from)
        const to = from + node.nodeSize
        console.log("shape node", node)
        console.log("shape node size", node.nodeSize)
        console.log("getting ending position", to)
        const transaction = editor.state.tr.setSelection(
            //select everything in the shape between from and to
            editor.state.selection.constructor.create(editor.state.doc, from, to)
        )
        editor.view.dispatch(transaction)
        editor.view.focus()
    }

    // Calculate responsive values
    const containerPadding = getResponsiveValue(8, parentContainerWidth) // p-2 equivalent
    const innerPadding = getResponsiveValue(24, parentContainerWidth) // p-6 equivalent
    const borderRadius = getResponsiveValue(8, parentContainerWidth) // rounded-lg equivalent

    return (
        <NodeViewWrapper
            ref={ref}
            as='div'
            className="w-full box-border h-full relative group"
            style={{ padding: `${containerPadding}px` }}
        >
            {/* Shape selection button */}
            <div
                className="absolute left-1 top-1 bg-gray-200 opacity-0 group-hover:opacity-100 cursor-pointer p-1 text-black hover:bg-gray-300 rounded z-10"
                onClick={selectShape}
                title="Select shape"
            >
                ⋮
            </div>
            <div
                className="bg-white h-full w-full border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center gap-4"
                style={{
                    padding: `${innerPadding}px`,
                    borderRadius: `${borderRadius}px`
                }}
            >
                <NodeViewContent />
            </div>
        </NodeViewWrapper>
    );
}
