"use client"
import React from 'react'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import { useElementTracking } from '@/hooks/useElementTracking'
import { getResponsiveFontSize, getResponsiveStrokeWidth } from '@/utils/responsive'

export default function ImageView({ editor, node, getPos }: { editor: any, node: any, getPos: any }) {
    const { ref, elementId, parentContainerWidth } = useElementTracking({
        elementType: 'image',
        node,
        getElementData: (elementId, slideNumber, coordinates) => ({
            content: node.textContent || ''
        })
    })

    return (
        <NodeViewWrapper
            ref={ref}
            className="relative group w-full h-full"
        >
            {/* Actual editable header */}
            <NodeViewContent
                as="img"
                src={node.attrs.src}
                className=""
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: node.attrs.borderRadius,
                }}
            />
        </NodeViewWrapper>
    )
} 