"use client"
import React from 'react'
import { NodeViewWrapper, NodeViewContent, ReactNodeViewRenderer } from '@tiptap/react'
import { useElementTracking } from '@/hooks/useElementTracking'
import { useResponsiveFontSize, useResponsiveStrokeWidth } from '@/utils/responsive'
import Heading from '@tiptap/extension-heading'
import { allStyleAttributes } from '@/utils/styles'
export const CustomHeader = Heading.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            ...allStyleAttributes,
        }
    },
    renderHTML({ HTMLAttributes }) {
        const styles = [];
        if (HTMLAttributes.color) styles.push(`color: ${HTMLAttributes.color}`);
        if (HTMLAttributes.gridArea) styles.push(`grid-area: ${HTMLAttributes.gridArea}`);
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
            `h${this.options.levels[0]}`,
            {
                ...HTMLAttributes,
                style: styles.length > 0 ? styles.join('; ') : undefined,
            },
            0,
        ];
    },
    addNodeView() {
        return ReactNodeViewRenderer(HeaderView)
    },
})


export default function HeaderView({ editor, node, getPos }: { editor: any, node: any, getPos: any }) {
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
        return useResponsiveFontSize(baseSizes[level as keyof typeof baseSizes] || 24)
    }
    node.attrs.fontSize = getHeaderFontSize(level)
    const { ref, elementId, parentContainerWidth } = useElementTracking({
        elementType: 'heading',
        node,
        getElementData: (elementId, slideNumber, coordinates) => {
            // Get the current node attributes at the time this function is called

            const currentNode = editor.state.doc.nodeAt(getPos());
            // console.log("currentNode of header", currentNode)
            const { level, ...styleAttrs } = currentNode?.attrs || {};
            // console.log("styleAttrs of header", styleAttrs)
            return {
                content: currentNode?.textContent || '',
                style: styleAttrs,
            }
        }
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


    return (
        <NodeViewWrapper
            ref={ref}
            className="relative group"
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
                    paddingTop: useResponsiveStrokeWidth(16),
                    color: node.attrs.color || 'black',
                    textAlign: node.attrs.textAlign || '',
                    fontWeight: node.attrs.fontWeight || '',
                    alignSelf: node.attrs.alignSelf || '',
                }}
            />
        </NodeViewWrapper>
    )
} 