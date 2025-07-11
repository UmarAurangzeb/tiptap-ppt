// extensions/SlideBody.ts
import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import BlockContainerNodeView from '@/app/components/BlockContainerNode/BlockNodeView'
import { allStyleAttributes } from '@/app/components/TiptapEditor'
export const BlockContainerNode = Node.create({
    name: 'blockContainerNode',
    group: 'block',
    content: 'block+',

    addAttributes() {
        return {
            class: {
                default: '',
            },
            ...allStyleAttributes,
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
                    borderWidth: (node as HTMLElement).style.borderWidth || '',
                    borderStyle: (node as HTMLElement).style.borderStyle || '',
                    borderColor: (node as HTMLElement).style.borderColor || '',
                    borderRadius: (node as HTMLElement).style.borderRadius || '',
                    marginTop: (node as HTMLElement).style.marginTop || '',
                    marginBottom: (node as HTMLElement).style.marginBottom || '',
                    marginLeft: (node as HTMLElement).style.marginLeft || '',
                    marginRight: (node as HTMLElement).style.marginRight || '',
                }),
            },
        ]
    },
    renderHTML({ HTMLAttributes }) {
        const styles = [];
        if (HTMLAttributes.color) styles.push(`color: ${HTMLAttributes.color}`);
        if (HTMLAttributes.textAlign) styles.push(`text-align: ${HTMLAttributes.textAlign}`);
        if (HTMLAttributes.fontWeight) styles.push(`font-weight: ${HTMLAttributes.fontWeight}`);
        if (HTMLAttributes.alignSelf) styles.push(`align-self: ${HTMLAttributes.alignSelf}`);
        if (HTMLAttributes.justifySelf) styles.push(`justify-self: ${HTMLAttributes.justifySelf}`);
        if (HTMLAttributes.marginLeft) styles.push(`margin-left: ${HTMLAttributes.marginLeft}`);
        if (HTMLAttributes.marginRight) styles.push(`margin-right: ${HTMLAttributes.marginRight}`);
        if (HTMLAttributes.backgroundColor) styles.push(`background-color: ${HTMLAttributes.backgroundColor}`);
        if (HTMLAttributes.width) styles.push(`width: ${HTMLAttributes.width}`);
        if (HTMLAttributes.height) styles.push(`height: ${HTMLAttributes.height}`);
        if (HTMLAttributes.borderWidth) styles.push(`border-width: ${HTMLAttributes.borderWidth}`);
        if (HTMLAttributes.borderStyle) styles.push(`border-style: ${HTMLAttributes.borderStyle}`);
        if (HTMLAttributes.borderColor) styles.push(`border-color: ${HTMLAttributes.borderColor}`);
        if (HTMLAttributes.borderRadius) styles.push(`border-radius: ${HTMLAttributes.borderRadius}`);
        if (HTMLAttributes.marginTop) styles.push(`margin-top: ${HTMLAttributes.marginTop}`);
        if (HTMLAttributes.marginBottom) styles.push(`margin-bottom: ${HTMLAttributes.marginBottom}`);
        return ['block-container', mergeAttributes(HTMLAttributes, {
            style: styles.length > 0 ? styles.join('; ') : undefined,
        }), 0]
    },
    addNodeView() {
        return ReactNodeViewRenderer(BlockContainerNodeView)
    },
})

