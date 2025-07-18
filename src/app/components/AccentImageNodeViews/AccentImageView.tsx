import React, { useState } from 'react';
import { NodeViewWrapper, NodeViewContent, ReactNodeViewProps } from '@tiptap/react';
import clsx from 'clsx';

import { Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
export const AccentImageNode = Node.create({
    name: 'accentImage',
    group: 'block',
    content: 'image? accentImageContent?',
    addAttributes() {
        return {
            variant: { default: 'leftImage' },
            slideNumber: { default: '2' },
        }
    },
    parseHTML() {
        return [
            {
                tag: 'accentimage-layout',
                getAttrs: node => ({
                    variant: node.getAttribute('variant'),
                    slideNumber: node.getAttribute('slideNumber'),
                }),
            },
        ]
    },
    renderHTML({ HTMLAttributes }) {
        return ['accentimage-layout', HTMLAttributes, 0]
    },
    addNodeView() {
        return ReactNodeViewRenderer(AccentImageView)
    },
})

export const AccentImageContentNode = Node.create({
    name: 'accentImageContent',
    group: 'block',
    content: 'heading? paragraph*',
    parseHTML() {
        return [
            {
                tag: 'accentimage-content',
            }
        ]
    },
    renderHTML({ HTMLAttributes }) {
        return ['accentimage-content', HTMLAttributes, 0]
    },
    addNodeView() {
        return ReactNodeViewRenderer(AccentImageContentView)
    },
})

export default function AccentImageView({ node, updateAttributes }: ReactNodeViewProps) {
    let { variant } = node.attrs;
    // console.log(variant, shapeSize, imagePosition);
    const variants = [
        { value: 'leftImage', label: 'Left Image', icon: '⊞' },
        { value: 'rightImage', label: 'Right Image', icon: '⊡' },

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

                <NodeViewContent className={`accentimage-grid ${variant}`} />

            </NodeViewWrapper>
        </>
    );
}


export function AccentImageContentView({ node, updateAttributes }: ReactNodeViewProps) {
    return (
        <NodeViewWrapper as="div" className="w-full h-full relative">
            <NodeViewContent className="accentimage-content" />
        </NodeViewWrapper>
    );
}