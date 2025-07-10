import React, { useState } from 'react';
import { NodeViewWrapper, NodeViewContent, ReactNodeViewProps } from '@tiptap/react';
import clsx from 'clsx';
export default function HeaderTextView({ node, updateAttributes }: ReactNodeViewProps) {
    let { variant, slideNumber } = node.attrs;
    const variants = [
        { value: 'leftHeader', label: 'Left Header', icon: '⊞' },
        { value: 'centerHeader', label: 'Center Header', icon: '⊟' },
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

                <NodeViewContent className={`header-text-grid ${variant}`} />
            </NodeViewWrapper>
        </>
    );
}
