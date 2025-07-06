import React, { useState } from 'react';
import { NodeViewWrapper, NodeViewContent, ReactNodeViewProps } from '@tiptap/react';
export default function SmartLayoutView({ node, updateAttributes }: ReactNodeViewProps) {
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
