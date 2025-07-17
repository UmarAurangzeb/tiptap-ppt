import { ListItem } from "@tiptap/extension-list-item"
import { NodeViewWrapper, NodeViewContent, ReactNodeViewRenderer, mergeAttributes } from "@tiptap/react"
import NextImage from "next/image"
import { useResponsiveFontSize, useResponsiveStrokeWidth } from "@/utils/responsive"
import { useElementTracking } from "@/hooks/useElementTracking"
import { useRef } from "react"
import { allStyleAttributes } from "@/utils/styles"
export const CustomListItem = ListItem.extend({
    content: 'block*',
    addAttributes() {
        return {
            class: {
                default: '',
            },
            bulletColor: {
                default: '',
            },
            bulletText: {
                default: '',
            },
            ...allStyleAttributes
        }
    },
    parseHTML() {
        return [
            {
                tag: 'li',
                getAttrs: node => ({
                    class: node.getAttribute('class'),
                    bulletColor: node.getAttribute('bulletColor'),
                    bulletText: node.getAttribute('bulletText'),
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
        if (HTMLAttributes.marginLeft) styles.push(`margin-left: ${HTMLAttributes.marginLeft}`);
        if (HTMLAttributes.marginRight) styles.push(`margin-right: ${HTMLAttributes.marginRight}`);
        if (HTMLAttributes.justifySelf) styles.push(`justify-self: ${HTMLAttributes.justifySelf}`);
        if (HTMLAttributes.backgroundColor) styles.push(`background-color: ${HTMLAttributes.backgroundColor}`);
        if (HTMLAttributes.width) styles.push(`width: ${HTMLAttributes.width}`);
        if (HTMLAttributes.height) styles.push(`height: ${HTMLAttributes.height}`);
        if (HTMLAttributes.borderWidth) styles.push(`border-width: ${HTMLAttributes.borderWidth}`);
        if (HTMLAttributes.borderStyle) styles.push(`border-style: ${HTMLAttributes.borderStyle}`);
        if (HTMLAttributes.borderColor) styles.push(`border-color: ${HTMLAttributes.borderColor}`);
        if (HTMLAttributes.borderRadius) styles.push(`border-radius: ${HTMLAttributes.borderRadius}`);
        if (HTMLAttributes.marginTop) styles.push(`margin-top: ${HTMLAttributes.marginTop}`);
        if (HTMLAttributes.marginBottom) styles.push(`margin-bottom: ${HTMLAttributes.marginBottom}`);
        if (HTMLAttributes.display) styles.push(`display: ${HTMLAttributes.display}`);
        if (HTMLAttributes.flexDirection) styles.push(`flex-direction: ${HTMLAttributes.flexDirection}`);
        return ['li', mergeAttributes(HTMLAttributes, { style: styles.join(';') }), 0]
    },
    addNodeView() {
        return ReactNodeViewRenderer(CustomListItemView)
    },
})

const CustomListItemView = ({ editor, node, getPos }: { editor: any, node: any, getPos: any }) => {
    const { class: className, bulletColor, bulletText, display, flexDirection } = node.attrs;
    // console.log(bulletText)
    let bulletfontSize = useResponsiveStrokeWidth(12)
    const { ref, elementId, parentContainerWidth } = useElementTracking({
        elementType: 'bullet',
        node,
        getElementData: (elementId, slideNumber, coordinates) => {
            // Get the current node attributes at the time this function is called
            const currentNode = editor.state.doc.nodeAt(getPos());
            const { bulletText, ...styleAttrs } = currentNode?.attrs || {};
            return {
                content: '',
                style: styleAttrs,
                bulletText: bulletText,
                bulletfontSize: bulletfontSize

            }
        }
    })
    let ListStyle = {
        gap: useResponsiveStrokeWidth(20),
        flexDirection: flexDirection || 'row',
    }

    return (
        <NodeViewWrapper as="li" className={`flex items-start`} style={ListStyle}>
            <div className="flex-shrink-0" ref={ref}>
                <svg width={!bulletText ? useResponsiveStrokeWidth(35) : useResponsiveStrokeWidth(75)} height={!bulletText ? useResponsiveStrokeWidth(35) : useResponsiveStrokeWidth(80)} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r={!bulletText ? "8" : "9"} fill={bulletColor} />
                    {bulletText && <text
                        x="10"
                        y="10"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="black"
                        fontSize={bulletfontSize}
                        fontFamily="sans-serif"
                    >
                        {bulletText}
                    </text>}
                </svg>
            </div>
            <NodeViewContent className="flex-1 " />
        </NodeViewWrapper>
    )
}