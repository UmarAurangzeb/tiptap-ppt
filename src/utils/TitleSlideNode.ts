// SmartLayoutNode.ts
import { Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import TitleSlideView from '@/app/components/TitleSlideView'
export const TitleSlide = Node.create({
    name: 'titleSlide',
    group: 'block',
    content: 'image? heading? paragraph*',
    addAttributes() {
        return {
            variant: { default: 'imageTop' },
        }
    },
    parseHTML() {
        return [
            {
                tag: 'title-slide',
                getAttrs: node => ({
                    variant: node.getAttribute('variant'),
                }),
            },
        ]
    },
    renderHTML({ HTMLAttributes }) {
        return ['title-slide', HTMLAttributes, 0]
    },
    addNodeView() {
        return ReactNodeViewRenderer(TitleSlideView)
    },
})


