import { Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import TextCardLayoutView from '@/app/components/textCardNodeView/TextCardNodeView'

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


