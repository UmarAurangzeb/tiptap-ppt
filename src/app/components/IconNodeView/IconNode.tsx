import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import React, { useEffect, useRef } from 'react'
import { allStyleAttributes } from '@/utils/styles'
import { faStar, faCheck, faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useResponsiveFontSize } from '@/utils/responsive'
import { useElementTracking } from '@/hooks/useElementTracking'
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
    const { ref, elementId, parentContainerWidth } = useElementTracking({
        elementType: 'icon',
        node: props.node,
        getElementData: (elementId: string, slideNumber: string, coordinates: any) => {
            let currentNode = props.editor.state.doc.nodeAt(props.getPos());
            let { iconName, iconColor, ...styleAttrs } = currentNode?.attrs || {};
            return {
                iconName: iconName,
                style: {
                    color: iconColor,
                    ...styleAttrs
                },
            }
        }
    })
    const iconRef = useRef<any>(null);

    const ICON_MAP: { [key: string]: IconDefinition } = {
        'fa-solid fa-star': faStar,
        'fa-solid fa-check': faCheck,
        'fa-solid fa-times': faTimes,
    }


    const getResponsiveIconSize = (baseSize: number = 60) => {
        const responsiveSize = useResponsiveFontSize(baseSize);
        const sizeInPixels = parseInt(responsiveSize.replace('px', ''));
        if (sizeInPixels <= 12) return 'xs';
        if (sizeInPixels <= 14) return 'sm';
        if (sizeInPixels <= 16) return '1x';
        if (sizeInPixels <= 20) return 'lg';
        if (sizeInPixels <= 24) return 'xl';
        if (sizeInPixels <= 32) return '2xl';
        if (sizeInPixels <= 48) return '3x';
        if (sizeInPixels <= 64) return '4x';
        if (sizeInPixels <= 80) return '5x';
        if (sizeInPixels <= 96) return '6x';
        if (sizeInPixels <= 112) return '7x';
        if (sizeInPixels <= 128) return '8x';
        if (sizeInPixels <= 144) return '9x';
        return '10x';
    };

    return (
        <NodeViewWrapper as="div" className="inline-block">
            <FontAwesomeIcon ref={ref as any} id={elementId} icon={ICON_MAP[props.node.attrs.iconName]} size={getResponsiveIconSize()} color={props.node.attrs.iconColor || undefined} />
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