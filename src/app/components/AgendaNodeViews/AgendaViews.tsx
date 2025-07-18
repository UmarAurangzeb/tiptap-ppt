import React, { useEffect, useRef, useState } from 'react';
import { NodeViewWrapper, NodeViewContent, ReactNodeViewProps } from '@tiptap/react';
import clsx from 'clsx';
import { useElementTracking } from '@/hooks/useElementTracking';
import Image from 'next/image';
import { useResponsiveFontSize, useResponsiveStrokeWidth } from '@/utils/responsive'


import { Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { mergeAttributes } from '@tiptap/core'

export const Agenda = Node.create({
    name: 'agenda',
    group: 'block',
    content: 'image? blockContainerNode',
    addAttributes() {
        return {
            variant: {
                default: 'bulletHeading',
                parseHTML: (element: any) => element.getAttribute('variant') || 'bulletHeading',
            },

            slideNumber: {
                default: null,
                parseHTML: (element: any) => element.getAttribute('slideNumber'),
                renderHTML: (attributes: any) => {
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
                tag: 'agenda',
                getAttrs: node => ({
                    variant: node.getAttribute('variant') || 'bulletHeading',
                    slideNumber: node.getAttribute('slideNumber'),
                }),
            },
        ]
    },
    renderHTML({ HTMLAttributes }) {
        return ['agenda', mergeAttributes(HTMLAttributes, {
            'data-variant': HTMLAttributes.variant || 'bulletHeading',
        }), 0]
    },
    addNodeView() {
        return ReactNodeViewRenderer(AgendaView)
    },
})






const AgendaView = (props: any) => {
    const { slideNumber, variant, ...rest } = props.node.attrs  // Change from props.HTMLAttributes to props.node.attrs
    const wrapperRef = useRef<HTMLDivElement>(null);
    const variants = [
        { value: 'bulletHeading', label: 'Bullet Heading', icon: '⊞' },
    ]
    const changeVariant = (newVariant: string) => {
        if (newVariant !== variant) {
            let oldVariant = variant;
            props.updateAttributes({ variant: newVariant });
            // props.onVariantChange?.(newVariant, oldVariant, props.node.type.name, slideNumber)
        }
    }

    const getCurrentVariantIndex = () => {
        return variants.findIndex(v => v.value === variant) || 0;
    }
    const getNextVariant = () => {
        const currentIndex = getCurrentVariantIndex();
        const nextIndex = (currentIndex + 1) % variants.length;
        return variants[nextIndex];
    }

    useEffect(() => {
        if (wrapperRef.current) {
            // Find the parent .react-renderer.node-bulletList
            let parent = wrapperRef.current.parentElement;
            while (parent && !parent.classList.contains('node-agenda')) {
                parent = parent.parentElement;
            }
            if (parent) {
                // Set data-variant or class
                parent.setAttribute('data-variant', variant);
                // Remove any previous variant-... class
                parent.classList.forEach(cls => {
                    if (cls.startsWith('variant-')) parent.classList.remove(cls);
                });
                parent.classList.add(`variant-${variant}`);
            }
        }
    }, [variant]);

    return (
        <NodeViewWrapper as="div" ref={wrapperRef} className="absolute w-full">
            <button
                className="bg-blue-500 absolute rights-0 top-[-20px] text-white px-3 py-1 text-sm cursor-pointer rounded-md hover:bg-blue-600 transition-colors z-10"
                onClick={() => {
                    const nextVariant = getNextVariant()
                    changeVariant(nextVariant.value)
                }}
                title={`Current: ${variant}, Click to switch`}
            >
                {variants.find(v => v.value === variant)?.label || variants[0].label}
            </button>
        </NodeViewWrapper>
    )
}





