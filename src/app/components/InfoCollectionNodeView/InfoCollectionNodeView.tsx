import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import React, { useEffect, useRef } from 'react'

export const InfoCollectionNode = Node.create({
    name: 'infoCollection',
    group: 'block',
    content: 'heading* blockContainerNode*',
    addAttributes() {
        return {
            variant: {
                default: 'vertical',
                parseHTML: element => element.getAttribute('variant') || 'vertical'

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
                tag: 'info-collection',
                getAttrs: (node: any) => ({
                    variant: node.getAttribute('variant') || 'vertical',
                    slideNumber: node.getAttribute('slideNumber'),
                }),
            },
        ]
    },
    renderHTML({ HTMLAttributes }) {
        return [
            'info-collection',
            {
                ...mergeAttributes(HTMLAttributes, {
                    'info-collection': HTMLAttributes.variant || 'vertical',
                }),
            },
            0
        ]
    },
    addNodeView() {
        return ReactNodeViewRenderer(InfoCollectionNodeView)
    },
})

const InfoCollectionNodeView = (props: any) => {
    const { slideNumber, variant, ...rest } = props.node.attrs  // Change from props.HTMLAttributes to props.node.attrs
    const wrapperRef = useRef<HTMLDivElement>(null);
    const variants = [
        { value: 'vertical', label: 'Vertical', icon: '⊞' },
        { value: 'horizontal', label: 'Horizontal', icon: '⊡' },
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
            while (parent && !parent.classList.contains('node-infoCollection')) {
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



