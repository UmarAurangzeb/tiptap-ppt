// SmartLayoutNode.ts
import SmartLayoutItemView from '@/app/components/SmartLayoutItemView'
import { Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { AgendaView, AgendaItemView, BulletHeadingView, AgendaItemParentView } from '@/app/components/AgendaNodeViews/AgendaViews'

export const Agenda = Node.create({
    name: 'agenda',
    group: 'block',
    content: 'image? agendaItemParent',
    addAttributes() {
        return {
            variant: { default: 'bulletHeading' },
            slideNumber: { default: '2' },
        }
    },
    parseHTML() {
        return [
            {
                tag: 'agenda',
                getAttrs: node => ({
                    variant: node.getAttribute('variant'),
                    slideNumber: node.getAttribute('slideNumber'),
                }),
            },
        ]
    },
    renderHTML({ HTMLAttributes }) {
        return ['agenda', HTMLAttributes, 0]
    },
    addNodeView() {
        return ReactNodeViewRenderer(AgendaView)
    },
})


export const AgendaItemParent = Node.create({
    name: 'agendaItemParent',
    group: 'block',
    content: 'agendaItem*',
    parseHTML() {
        return [{ tag: 'agenda-item-parent' }]
    },
    renderHTML({ HTMLAttributes }) {
        return ['agenda-item-parent', HTMLAttributes, 0]
    },
    addNodeView() {
        return ReactNodeViewRenderer(AgendaItemParentView)
    },
})

export const AgendaItem = Node.create({
    name: 'agendaItem',
    group: 'block',
    content: 'bulletHeading? heading',
    parseHTML() {
        return [{ tag: 'agenda-item' }]
    },
    renderHTML({ HTMLAttributes }) {
        return ['agenda-item', HTMLAttributes, 0]
    },
    addNodeView() {
        return ReactNodeViewRenderer(AgendaItemView)
    },
})



export const BulletHeading = Node.create({
    name: 'bulletHeading',
    group: 'block',
    inline: false,
    atom: true,
    selectable: false,
    parseHTML() {
        return [{ tag: 'bullet-heading' }]
    },

    renderHTML({ HTMLAttributes }) {
        return ['bullet-heading', HTMLAttributes]
    },

    addNodeView() {
        return ReactNodeViewRenderer(BulletHeadingView)
    },
})


