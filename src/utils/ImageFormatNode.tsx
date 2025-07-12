import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import React from 'react'

const ImageFormatNodeView = (props: any) => {
    const { slideNumber, variant, ...rest } = props.node.attrs  // Change from props.HTMLAttributes to props.node.attrs

    const variants = [
        { value: 'imageFormat-squared', label: 'Image Format', icon: '⊞' },
        { value: 'imageFormat-rounded', label: 'Rounded Format', icon: '⊡' },
    ]

    const changeVariant = (newVariant: string) => {
        props.updateAttributes({ variant: newVariant });
    }

    const getCurrentVariantIndex = () => {
        return variants.findIndex(v => v.value === variant) || 0;
    }

    const getNextVariant = () => {
        const currentIndex = getCurrentVariantIndex();
        const nextIndex = (currentIndex + 1) % variants.length;
        return variants[nextIndex];
    }

    return (
        <NodeViewWrapper as="div" className="absolute">
            <button
                className="bg-blue-500 absolute left-0 top-0 text-white px-3 py-1 text-sm cursor-pointer rounded-md hover:bg-blue-600 transition-colors z-10"
                onClick={() => {
                    const nextVariant = getNextVariant()
                    changeVariant(nextVariant.value)
                }}
                title={`Current: ${variant}, Click to switch`}
            >
                {variants.find(v => v.value === variant)?.label || variants[0].label}
            </button>
            {/* Children will be rendered here, inside the wrapper */}
            <div className="w-full h-full relative z-0">
                {props.children}
            </div>
        </NodeViewWrapper>
    )
}

export const ImageFormatNode = Node.create({
    name: 'imageFormat',
    group: 'block',
    content: 'image* blockContainerNode*',
    addAttributes() {
        return {
            variant: {
                default: 'imageFormat-squared',
                parseHTML: element => element.getAttribute('variant') || 'imageFormat-squared'
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
                tag: 'image-format',
                getAttrs: (node: any) => ({
                    variant: node.getAttribute('variant') || 'imageFormat-squared',
                    slideNumber: node.getAttribute('slideNumber'),
                }),
            },
        ]
    },
    renderHTML({ HTMLAttributes }) {
        return ['image-format', mergeAttributes(HTMLAttributes), 0]
    },
    addNodeView() {
        return ReactNodeViewRenderer(ImageFormatNodeView)
    },
}) 