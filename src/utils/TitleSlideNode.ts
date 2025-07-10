import TitleSlideView from '@/app/components/TitleNodeViews/TitleSlideView'
import { Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
export const TitleSlide = Node.create({
    name: 'titleSlide',
    group: 'block',
    content: 'image? heading? paragraph*',
    addAttributes() {
        return {
            variant: { default: 'imageTop' },
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
                tag: 'title-slide',
                getAttrs: node => ({
                    variant: node.getAttribute('variant'),
                    slideNumber: node.getAttribute('slideNumber'),
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


