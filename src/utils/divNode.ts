// extensions/SlideBody.ts
import { Node, mergeAttributes } from '@tiptap/core'

export const DivNode = Node.create({
    name: 'divNode',

    group: 'block',
    content: 'block+',

    addAttributes() {
        return {
            class: {
                default: '',
            },
            tabindex: {
                default: '0',
            },
            n: {
                default: '',
            }
        }
    },

    parseHTML() {
        return [
            {
                tag: 'div',
                getAttrs: node => ({
                    class: (node as HTMLElement).getAttribute('class'),
                    n: (node as HTMLElement).getAttribute('n'),
                }),
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes), 0]
    },
})
