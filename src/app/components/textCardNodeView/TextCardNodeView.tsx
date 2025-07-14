
import React, { useState } from 'react';
import { NodeViewWrapper, NodeViewContent, ReactNodeViewProps } from '@tiptap/react';
import clsx from 'clsx';
import { Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

export const TextCardLayout = Node.create({
    name: 'textCardLayout',
    group: 'block',
    content: ' heading? blockContainerNode{1}',
    addAttributes() {
        return {
            variant: { default: 'vertical' },
            slideNumber: {
                default: null,
                parseHTML: element => element.getAttribute('slideNumber'),
                renderHTML: attributes => {
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
                tag: 'text-card-layout',
                getAttrs: node => ({
                    variant: node.getAttribute('variant'),
                    slideNumber: node.getAttribute('slideNumber'),
                }),
            },
        ]
    },
    renderHTML({ HTMLAttributes }) {
        return ['text-card-layout', HTMLAttributes, 0]
    },
    addNodeView() {
        return ReactNodeViewRenderer(TextCardLayoutView)
    },
})




export default function TextCardLayoutView({ node, updateAttributes }: ReactNodeViewProps) {
    let { variant } = node.attrs;
    const variants = [
        { value: 'vertical', label: 'Vertical', icon: '⊞' },
        { value: 'horizontal', label: 'Horizontal', icon: '⊡' },
        { value: 'columns', label: 'Columns', icon: '⊡' },

    ];

    const changeVariant = (newVariant: string) => {
        updateAttributes({ variant: newVariant });
    };

    const getCurrentVariantIndex = () => {
        return variants.findIndex(v => v.value === variant);
    };

    const getNextVariant = () => {
        const currentIndex = getCurrentVariantIndex();
        const nextIndex = (currentIndex + 1) % variants.length;
        return variants[nextIndex];
    };

    return (
        <>
            <NodeViewWrapper as="div" className="w-full h-full relative">
                <button
                    className='bg-blue-500 absolute text-white px-3 py-1 text-sm cursor-pointer rounded-md  top-0  hover:bg-blue-600 transition-colors z-10'
                    onClick={() => {
                        const nextVariant = getNextVariant();
                        changeVariant(nextVariant.value);
                    }}
                    title={`Current: ${variant}, Click to switch`}
                >
                    {variants.find(v => v.value === variant)?.label}
                </button>

                <NodeViewContent className={`text-card-layout ${variant}`} />
            </NodeViewWrapper>
        </>
    );
}

