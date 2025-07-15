import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import React, { useEffect, useRef } from 'react'
import { allStyleAttributes } from '@/utils/styles'
import { faStar, faCheck, faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const IconNode = Node.create({
    name: 'icon',
    group: 'block',
    atom: true,
    addAttributes() {
        return {
            ...allStyleAttributes,
            iconName: {
                default: '',
                parseHTML: (element: any) => element.getAttribute('iconName') || 'fa-solid fa-star',
            },
            iconSize: {
                default: '1x',
                parseHTML: (element: any) => element.getAttribute('iconSize') || '1x',
            },
            iconColor: {
                default: null,
                parseHTML: (element: any) => element.getAttribute('iconColor') || null,
            },
        }
    },
    parseHTML() {
        return [
            {
                tag: 'icon',
                getAttrs: (node: any) => ({
                    iconName: node.getAttribute('iconName') || 'fa-solid fa-star',
                    iconSize: node.getAttribute('iconSize') || '1x',
                    iconColor: node.getAttribute('iconColor') || null,
                    color: node.style.color || null,
                    textAlign: node.style.textAlign || 'center',
                    fontWeight: node.style.fontWeight || 'bold',
                    alignSelf: node.style.alignSelf || 'center',
                    justifySelf: node.style.justifySelf || 'center',
                    marginLeft: node.style.marginLeft || '0',
                    marginRight: node.style.marginRight || '0',
                    backgroundColor: node.style.backgroundColor || '#D9D9D9',
                    width: node.style.width || '100px',
                    height: node.style.height || '100px',
                    borderWidth: node.style.borderWidth || '',
                    borderStyle: node.style.borderStyle || '',
                    borderColor: node.style.borderColor || '',
                    borderRadius: node.style.borderRadius || '0px',
                    marginTop: node.style.marginTop || '',
                    marginBottom: node.style.marginBottom || '',
                    display: node.style.display || 'block'
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

        return [
            'icon',
            {
                ...mergeAttributes(HTMLAttributes, {
                    style: styles.join('; ')
                }),
            },
            0
        ]
    },
    addNodeView() {
        return ReactNodeViewRenderer(IconNodeView as React.FC)
    },
})

const IconNodeView = (props: any) => {
    const {
        iconName,
        iconSize,
        iconColor,
        textAlign,
        fontWeight,
        alignSelf,
        justifySelf,
        marginLeft,
        marginRight,
        backgroundColor,
        width,
        height,
        borderWidth,
        borderStyle,
        borderColor,
        borderRadius,
        marginTop,
        marginBottom,
        display,
        ...rest
    } = props.node.attrs
    const wrapperRef = useRef<HTMLDivElement>(null);


    const iconStyle = {
        width: width || '100%',
        height: height || '100%',
        backgroundColor: backgroundColor || '',
        borderWidth: borderWidth || '',
        borderStyle: borderStyle || '',
        borderColor: borderColor || '',
        borderRadius: borderRadius || '',
        marginTop: marginTop || '',
        marginBottom: marginBottom || '',
        marginLeft: marginLeft || '',
        marginRight: marginRight || '',
        display: display || 'block',
    };

    const ICON_MAP: { [key: string]: IconDefinition } = {
        'fa-solid fa-star': faStar,
        'fa-solid fa-check': faCheck,
        'fa-solid fa-times': faTimes,
    }
    console.log("iconName", iconName)
    console.log("iconSize", iconSize)
    console.log("iconColor", iconColor)

    return (
        <NodeViewWrapper as="div" className="inline-block">
            <FontAwesomeIcon icon={ICON_MAP[iconName]} size={iconSize} color={iconColor || undefined} />
        </NodeViewWrapper>
    )
}

export default IconNodeView



// const IconNodeView = ({ node }: any) => {
//     const { name, size, color } = node.attrs
//     const icon = ICON_MAP[name as keyof typeof ICON_MAP] || faStar

//     return (
//         <NodeViewWrapper as="div" className="inline-block">
//             <FontAwesomeIcon icon={icon} size={size} color={color || undefined} />
//         </NodeViewWrapper>
//     )
// }