// components/ParagraphView.tsx
"use client"
import React from 'react'
import { NodeViewWrapper, NodeViewContent, ReactNodeViewRenderer } from '@tiptap/react'
import { useElementTracking } from '@/hooks/useElementTracking'
import { useResponsiveFontSize, useResponsiveStrokeWidth } from '@/utils/responsive'
import Paragraph from '@tiptap/extension-paragraph'
import { allStyleAttributes } from '@/utils/styles'
export const CustomParagraph = Paragraph.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            ...allStyleAttributes,
        }
    },
    renderHTML({ HTMLAttributes }) {
        const styles = [];
        if (HTMLAttributes.color) styles.push(`color: ${HTMLAttributes.color}`);
        if (HTMLAttributes.textAlign) styles.push(`text-align: ${HTMLAttributes.textAlign}`);
        if (HTMLAttributes.fontWeight) styles.push(`font-weight: ${HTMLAttributes.fontWeight}`);
        if (HTMLAttributes.alignSelf) styles.push(`align-self: ${HTMLAttributes.alignSelf}`);
        if (HTMLAttributes.marginLeft) styles.push(`margin-left: ${HTMLAttributes.marginLeft}`);
        if (HTMLAttributes.marginRight) styles.push(`margin-right: ${HTMLAttributes.marginRight}`);
        if (HTMLAttributes.justifySelf) styles.push(`justify-self: ${HTMLAttributes.justifySelf}`);
        if (HTMLAttributes.backgroundColor) styles.push(`background-color: ${HTMLAttributes.backgroundColor}`);
        if (HTMLAttributes.width) styles.push(`width: ${HTMLAttributes.width}`);
        if (HTMLAttributes.height) styles.push(`height: ${HTMLAttributes.height}`);
        if (HTMLAttributes.borderWidth) styles.push(`border-width: ${HTMLAttributes.borderWidth}`);
        if (HTMLAttributes.borderStyle) styles.push(`border-style: ${HTMLAttributes.borderStyle}`);
        if (HTMLAttributes.borderColor) styles.push(`border-color: ${HTMLAttributes.borderColor}`);
        if (HTMLAttributes.borderRadius) styles.push(`border-radius: ${HTMLAttributes.borderRadius}`);
        if (HTMLAttributes.marginTop) styles.push(`margin-top: ${HTMLAttributes.marginTop}`);
        if (HTMLAttributes.marginBottom) styles.push(`margin-bottom: ${HTMLAttributes.marginBottom}`);
        return [
            `p`,
            {
                ...HTMLAttributes,
                style: styles.length > 0 ? styles.join('; ') : undefined,
            },
            0,
        ];
    },
    addNodeView() {
        return ReactNodeViewRenderer(ParagraphView)
    },
})

export default function ParagraphView({ editor, node, getPos }: { editor: any, node: any, getPos: any }) {
    const { ref, elementId, parentContainerWidth } = useElementTracking({
        elementType: node.type.name,
        node,
        getElementData: (elementId, slideNumber, coordinates) => ({
            content: node.textContent || '',
            style: node.attrs || ''
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
                    fontSize: useResponsiveFontSize(32),
                    // paddingTop: useResponsiveStrokeWidth(16),
                    // paddingBottom: useResponsiveStrokeWidth(16),
                    // lineHeight: useResponsiveStrokeWidth(40),
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
