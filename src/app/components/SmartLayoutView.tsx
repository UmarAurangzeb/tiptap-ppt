import React, { useState } from 'react';
import { NodeViewWrapper, NodeViewContent, ReactNodeViewProps } from '@tiptap/react';

import { Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { useElementTracking } from '@/hooks/useElementTracking'
import { getResponsiveValue } from '@/utils/responsive'


export const SmartLayout = Node.create({
    name: 'smartLayout',
    group: 'block',
    content: 'smartLayoutItem+',
    addAttributes() {
        return {
            variant: { default: 'iconsText' },
            shapeSize: { default: 'lg' },
            imagePosition: { default: 'top' },
        }
    },
    parseHTML() {
        return [
            {
                tag: 'smart-layout',
                getAttrs: node => ({
                    variant: node.getAttribute('variant'),
                    shapeSize: node.getAttribute('shapesize'),
                    imagePosition: node.getAttribute('imageposition'),
                }),
            },
        ]
    },
    renderHTML({ HTMLAttributes }) {
        return ['smart-layout', HTMLAttributes, 0]
    },
    addNodeView() {
        return ReactNodeViewRenderer(SmartLayoutView)
    },
})

export const SmartLayoutItem = Node.create({
    name: 'smartLayoutItem',
    group: 'block',
    content: 'icon? heading? paragraph*',
    parseHTML() {
        return [{ tag: 'smart-layout-item' }]
    },
    renderHTML() {
        return ['smart-layout-item', 0]
    },
    addNodeView() {
        return ReactNodeViewRenderer(SmartLayoutItemView)
    },
})

export const Icon = Node.create({
    name: 'icon',
    group: 'block',
    atom: true, //By making it an atom, the user can’t place the cursor inside it. They can delete or move it, but not "edit" it directly.
    addAttributes() {
        return {
            query: { default: '' },
            loadImageId: { default: '' },
            'ai-parsed-attrs': { default: '' },
        }
    },
    parseHTML() {
        return [{
            tag: 'icon',
            getAttrs: node => ({
                query: node.getAttribute('query'),
                loadImageId: node.getAttribute('loadImageId'),
                'ai-parsed-attrs': node.getAttribute('ai-parsed-attrs'),
            }),
        }]
    },
    renderHTML({ HTMLAttributes }) {
        return ['icon', HTMLAttributes]
    },
    addNodeView() {
        return ReactNodeViewRenderer(IconView)
    },
})

export function SmartLayoutView({ node, updateAttributes }: ReactNodeViewProps) {
    let { variant, shapeSize, imagePosition } = node.attrs;
    // console.log(variant, shapeSize, imagePosition);
    const variants = [
        { value: 'iconText', label: '2×2 Grid', icon: '⊞' },
        { value: 'imageText', label: '3×2 Grid', icon: '⊡' },
    ];

    const changeVariant = (newVariant: string) => {
        updateAttributes({ variant: newVariant });
    };

    return (
        <>

            <NodeViewWrapper as="div" className="w-full h-full smart-layout-parent relative">
                <button
                    className='bg-blue-500 absolute text-white px-3 py-1 text-sm cursor-pointer rounded-md  top-0  hover:bg-blue-600 transition-colors z-10'
                    onClick={() => {
                        if (variant === 'iconText') {
                            changeVariant('imageText');
                        } else {
                            changeVariant('iconText');
                        }
                    }}
                    title={`Current: ${variant}, Click to switch`}
                >
                    {variant === 'iconText' ? '⊞ 2×2' : '⊡ 3×2'}
                </button>
                <NodeViewContent className={`smart-layout-grid ${variant}`} />
            </NodeViewWrapper>
        </>
    );
}




export function SmartLayoutItemView({ editor, node, getPos }: { editor: any, node: any, getPos: any }) {
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



export function IconView({ node }: ReactNodeViewProps) {
    const { query, loadImageId, 'ai-parsed-attrs': aiParsedAttrs } = node.attrs;

    // Parse the AI attributes if they exist
    let parsedAttrs = null;
    try {
        if (aiParsedAttrs) {
            parsedAttrs = JSON.parse(aiParsedAttrs);
        }
    } catch (error) {
        console.warn('Could not parse ai-parsed-attrs:', error);
    }

    return (
        <NodeViewWrapper className="icon-wrapper mb-4">
            <div
            // className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-2"
            >
                <div className="text-2xl text-blue-600">
                    {/* You can replace this with actual icon rendering logic */}
                    {query === 'brain' && '🧠'}
                    {query === 'language' && '💬'}
                    {query === 'palette' && '🎨'}
                    {query === 'tools' && '🔧'}
                    {!['brain', 'language', 'palette', 'tools'].includes(query) && '📌'}
                </div>
            </div>
            <div className="text-xs text-gray-500 text-center">
                {query && <div>Query: {query}</div>}
                {loadImageId && <div>ID: {loadImageId}</div>}
            </div>
        </NodeViewWrapper>
    );
}   