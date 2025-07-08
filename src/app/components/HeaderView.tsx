"use client"
import React from 'react'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import { useElementTracking } from '@/hooks/useElementTracking'
import { getResponsiveFontSize, getResponsiveStrokeWidth } from '@/utils/responsive'

export default function HeaderView({ editor, node, getPos }: { editor: any, node: any, getPos: any }) {
    const { ref, elementId, parentContainerWidth } = useElementTracking({
        elementType: 'heading',
        node,
        getElementData: (elementId, slideNumber, coordinates) => ({
            content: node.textContent || ''
        })
    })
    // console.log("parentContainerWidth from header", parentContainerWidth)
    const selectHeader = () => {
        const from = getPos()
        console.log("getting starting position", from)
        const to = from + node.nodeSize
        console.log("header node", node)
        console.log("header node size", node.nodeSize)
        console.log("getting ending position", to)
        const transaction = editor.state.tr.setSelection(
            //select everything in the header between from and to
            editor.state.selection.constructor.create(editor.state.doc, from, to)
        )
        editor.view.dispatch(transaction)
        editor.view.focus()
    }

    // Get header level for appropriate styling
    const level = node.attrs.level || 1
    const headerTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

    // Calculate responsive font sizes based on header level
    const getHeaderFontSize = (level: number): string => {
        const baseSizes = {
            1: 48,  // h1: 2em equivalent at 24px base
            2: 36,  // h2: 1.5em equivalent
            3: 31,  // h3: 1.3em equivalent
            4: 26,  // h4: 1.1em equivalent
            5: 24,  // h5: 1em equivalent
            6: 22   // h6: 0.9em equivalent
        }
        return getResponsiveFontSize(baseSizes[level as keyof typeof baseSizes] || 24, parentContainerWidth)
    }

    return (
        <NodeViewWrapper
            ref={ref}
            className="relative group pl-6"
        >
            {/* 3-dots button - Outside the heading */}
            <div
                className="absolute left-1 bg-gray-200 top-[1px] opacity-0 group-hover:opacity-100 cursor-pointer p-1 text-black hover:bg-gray-200 rounded"
                onClick={selectHeader}
            >
                ⋮
            </div>

            {/* Actual editable header */}
            <NodeViewContent
                as={headerTag}
                className=""
                style={{
                    fontSize: getHeaderFontSize(level),
                    marginBottom: getResponsiveStrokeWidth(12, parentContainerWidth),
                    color: node.attrs.color || 'black',
                    textAlign: node.attrs.textAlign || '',
                    fontWeight: node.attrs.fontWeight || '',
                    alignSelf: node.attrs.alignSelf || '',
                }}
            />
        </NodeViewWrapper>
    )
} 