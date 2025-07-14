import { ListItem } from "@tiptap/extension-list-item"
import { NodeViewWrapper, NodeViewContent, ReactNodeViewRenderer, mergeAttributes } from "@tiptap/react"
import NextImage from "next/image"
import { useResponsiveStrokeWidth } from "@/utils/responsive"
import { useElementTracking } from "@/hooks/useElementTracking"
import { useRef } from "react"
export const CustomListItem = ListItem.extend({
    content: 'block*',
    addAttributes() {
        return {
            class: {
                default: '',
            },
            bulletColor: {
                default: '',
            }
        }
    },
    parseHTML() {
        return [
            {
                tag: 'li',
                getAttrs: node => ({
                    class: node.getAttribute('class'),
                    bulletColor: node.getAttribute('bulletColor'),
                }),
            },
        ]
    },
    renderHTML({ HTMLAttributes }) {
        return ['li', mergeAttributes(HTMLAttributes), 0]
    },
    addNodeView() {
        return ReactNodeViewRenderer(CustomListItemView)
    },
})

const CustomListItemView = ({ node }: any) => {
    const { class: className, bulletColor } = node.attrs;
    const { ref, elementId, parentContainerWidth } = useElementTracking({
        elementType: 'bullet',
        node,
        getElementData: (elementId, slideNumber, coordinates) => ({
            content: '',
            style: node.attrs || ''
        })
    })
    return (
        <NodeViewWrapper as="li" className={`flex items-start`} style={{ gap: useResponsiveStrokeWidth(20) }}>
            <div className="flex-shrink-0" ref={ref}>
                <svg width={useResponsiveStrokeWidth(35)} height={useResponsiveStrokeWidth(35)} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="8" fill={bulletColor} />
                </svg>
            </div>
            <NodeViewContent className="flex-1 " />
        </NodeViewWrapper>
    )
}