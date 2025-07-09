// components/ParagraphView.tsx
"use client"
import React from 'react'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import { useElementTracking } from '@/hooks/useElementTracking'
import { getResponsiveFontSize, getResponsiveStrokeWidth } from '@/utils/responsive'

export default function ParagraphView({ editor, node, getPos }: { editor: any, node: any, getPos: any }) {
    const { ref, elementId, parentContainerWidth } = useElementTracking({
        elementType: node.type.name,
        node,
        getElementData: (elementId, slideNumber, coordinates) => ({
            content: node.textContent || ''
        })
    })

    const selectParagraph = () => {
        const from = getPos()
        console.log("getting starting position", from)
        const to = from + node.nodeSize
        console.log("node", node)
        console.log("node", node.nodeSize)
        console.log("getting ending position", to)
        const transaction = editor.state.tr.setSelection(
            //select everything in the paragraph between from and to
            editor.state.selection.constructor.create(editor.state.doc, from, to)
        )
        editor.view.dispatch(transaction)
        editor.view.focus()
    }

    return (
        <NodeViewWrapper ref={ref} className="relative group">
            {/* 3-dots button - outside the paragraph */}
            <div
                className="absolute left-1 bg-gray-200 top-[1px] opacity-0 group-hover:opacity-100 cursor-pointer p-1 text-black hover:bg-gray-200 rounded"
                onClick={selectParagraph}
            >
                ⋮
            </div>
            {/* Actual editable paragraph */}
            <NodeViewContent
                as="p"
                className="focus:outline-none"
                style={{
                    fontSize: getResponsiveFontSize(32, parentContainerWidth),
                    paddingTop: getResponsiveStrokeWidth(16, parentContainerWidth),
                    paddingBottom: getResponsiveStrokeWidth(16, parentContainerWidth),
                    lineHeight: getResponsiveStrokeWidth(40, parentContainerWidth),
                    textAlign: node.attrs.textAlign || '',
                    fontWeight: node.attrs.fontWeight || '',
                    alignSelf: node.attrs.alignSelf || '',
                    marginLeft: node.attrs.marginLeft || '',
                    marginRight: node.attrs.marginRight || '',
                    color: node.attrs.color || '',
                }}
            />
        </NodeViewWrapper>
    )
}
