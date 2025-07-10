
import { Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import HeaderTextView from '@/app/components/HeaderTextNodeViews/HeaderTextViews'
export const HeaderText = Node.create({
    name: 'headerText',
    group: 'block',
    content: 'heading? paragraph*',
    addAttributes() {
        return {
            variant: { default: 'leftHeader' },
            slideNumber: { default: '4' },
        }
    },
    parseHTML() {
        return [
            {
                tag: 'headertext-layout',
                getAttrs: node => ({
                    variant: node.getAttribute('variant'),
                    slideNumber: node.getAttribute('slideNumber'),
                }),
            },
        ]
    },
    renderHTML({ HTMLAttributes }) {
        return ['headertext-layout', HTMLAttributes, 0]
    },
    addNodeView() {
        return ReactNodeViewRenderer(HeaderTextView)
    },
})


