// SmartLayoutNode.ts
import { AccentImageContentView } from '@/app/components/AccentImageNodeViews/AccentImageView'
import { Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import AccentImageView from '@/app/components/AccentImageNodeViews/AccentImageView'
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