// SmartLayoutNode.ts
import { Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import SmartLayoutView from '../app/components/SmartLayoutView'
import SmartLayoutItemView from '../app/components/SmartLayoutItemView'
import IconView from '../app/components/IconView'

export const SmartLayout = Node.create({
    name: 'smartLayout',
    group: 'block',
    content: 'smartLayoutItem+',
    addAttributes() {
        return {
            variant: { default: 'iconsText' },
            shapeSize: { default: 'lg' },
            imagePosition: { default: 'top' },
        }
    },
    parseHTML() {
        return [
            {
                tag: 'smart-layout',
                getAttrs: node => ({
                    variant: node.getAttribute('variant'),
                    shapeSize: node.getAttribute('shapesize'),
                    imagePosition: node.getAttribute('imageposition'),
                }),
            },
        ]
    },
    renderHTML({ HTMLAttributes }) {
        return ['smart-layout', HTMLAttributes, 0]
    },
    addNodeView() {
        return ReactNodeViewRenderer(SmartLayoutView)
    },
})

export const SmartLayoutItem = Node.create({
    name: 'smartLayoutItem',
    group: 'block',
    content: 'icon? heading? paragraph*',
    parseHTML() {
        return [{ tag: 'smart-layout-item' }]
    },
    renderHTML() {
        return ['smart-layout-item', 0]
    },
    addNodeView() {
        return ReactNodeViewRenderer(SmartLayoutItemView)
    },
})

export const Icon = Node.create({
    name: 'icon',
    group: 'block',
    atom: true, //By making it an atom, the user can’t place the cursor inside it. They can delete or move it, but not "edit" it directly.
    addAttributes() {
        return {
            query: { default: '' },
            loadImageId: { default: '' },
            'ai-parsed-attrs': { default: '' },
        }
    },
    parseHTML() {
        return [{
            tag: 'icon',
            getAttrs: node => ({
                query: node.getAttribute('query'),
                loadImageId: node.getAttribute('loadImageId'),
                'ai-parsed-attrs': node.getAttribute('ai-parsed-attrs'),
            }),
        }]
    },
    renderHTML({ HTMLAttributes }) {
        return ['icon', HTMLAttributes]
    },
    addNodeView() {
        return ReactNodeViewRenderer(IconView)
    },
})