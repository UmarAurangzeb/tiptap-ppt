import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import React, { useEffect, useRef } from 'react'

export const BulletListNode = Node.create({
    name: 'bulletList',
    group: 'block',
    content: 'image* heading* blockContainerNode*',
    addAttributes() {
        return {
            variant: {
                default: 'leftImage',
                parseHTML: element => element.getAttribute('variant') || 'leftImage'

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
                tag: 'bullet-list',
                getAttrs: (node: any) => ({
                    variant: node.getAttribute('variant') || 'rightImage',
                    slideNumber: node.getAttribute('slideNumber'),
                }),
            },
        ]
    },
    renderHTML({ HTMLAttributes }) {
        return [
            'bullet-list',
            {
                ...mergeAttributes(HTMLAttributes, {
                    'data-variant': HTMLAttributes.variant || 'rightImage',
                }),
            },
            0
        ]
    },
    addNodeView() {
        return ReactNodeViewRenderer(BulletListNodeView)
    },
})

const BulletListNodeView = (props: any) => {
    const { slideNumber, variant, ...rest } = props.node.attrs  // Change from props.HTMLAttributes to props.node.attrs
    const wrapperRef = useRef<HTMLDivElement>(null);
    const variants = [
        { value: 'rightImage', label: 'Right Image', icon: '⊞' },
        { value: 'noImage', label: 'No Image', icon: '⊡' },
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
            while (parent && !parent.classList.contains('node-bulletList')) {
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



