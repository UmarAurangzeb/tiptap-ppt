import React, { useState } from 'react';
import { NodeViewWrapper, NodeViewContent, ReactNodeViewProps } from '@tiptap/react';
import clsx from 'clsx';
import { useElementTracking } from '@/hooks/useElementTracking';
import Image from 'next/image';
import { getResponsiveFontSize, getResponsiveStrokeWidth } from '@/utils/responsive';

export function AgendaView({ node, updateAttributes }: ReactNodeViewProps) {
    let { variant } = node.attrs;
    // console.log(variant, shapeSize, imagePosition);
    const variants = [
        { value: 'bulletHeading', label: 'Bullet Heading', icon: '⊞' },
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

                <NodeViewContent className={`agenda-grid ${variant}`} />
            </NodeViewWrapper>
        </>
    );
}

export function AgendaItemParentView({ node, updateAttributes }: ReactNodeViewProps) {
    return (
        <NodeViewWrapper as="div" className="agendaItem-parent">
            <NodeViewContent className={``} />
        </NodeViewWrapper>
    );
}

export function AgendaItemView({ node, updateAttributes }: ReactNodeViewProps) {
    let { variant } = node.attrs;
    return (
        <NodeViewWrapper as="div" className="">
            <NodeViewContent className={``} />
        </NodeViewWrapper>
    );
}



export function BulletHeadingView({ node, getPos }: any) {
    const { ref, elementId } = useElementTracking({
        elementType: 'bullet',
        node,
        getElementData: (elementId, slideNumber, coordinates) => ({
            content: node.textContent || ''
        }),
    })
    return (
        <NodeViewWrapper as="span" ref={ref} data-element-id={elementId} className="inline-block  mr-3">
            <svg width="23" height="23" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="8" fill="#D9D9D9" />
            </svg>
        </NodeViewWrapper>
    )
}


