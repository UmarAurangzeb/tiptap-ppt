// extensions/SlideBody.ts
import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import BlockContainerNodeView from '@/app/components/BlockContainerNode/BlockNodeView'

export const BlockContainerNode = Node.create({
    name: 'blockContainerNode',
    group: 'block',
    content: 'block+',

    addAttributes() {
        return {
            class: {
                default: '',
            },
            width: {
                default: '0%',
                parseHTML: element => element.style.width || '',
            },
            height: {
                default: '0%',
                parseHTML: element => element.style.height || '',
            },
            backgroundColor: {
                default: '',
                parseHTML: element => element.style.backgroundColor || '',
            }
        }
    },

    parseHTML() {
        return [
            {
                tag: 'block-container',
                getAttrs: node => ({
                    class: (node as HTMLElement).getAttribute('class'),
                    width: (node as HTMLElement).getAttribute('width'),
                    height: (node as HTMLElement).getAttribute('height'),
                    backgroundColor: (node as HTMLElement).style.backgroundColor || '',
                }),
            },
        ]
    },
    renderHTML({ HTMLAttributes }) {
        const styles = [];
        if (HTMLAttributes.backgroundColor) styles.push(`background-color: ${HTMLAttributes.backgroundColor}`);
        if (HTMLAttributes.width) styles.push(`width: ${HTMLAttributes.width}`);
        if (HTMLAttributes.height) styles.push(`height: ${HTMLAttributes.height}`);

        return ['block-container', mergeAttributes(HTMLAttributes, {
            style: styles.length > 0 ? styles.join('; ') : undefined,
        }), 0]
    },
    addNodeView() {
        return ReactNodeViewRenderer(BlockContainerNodeView)
    },
})

