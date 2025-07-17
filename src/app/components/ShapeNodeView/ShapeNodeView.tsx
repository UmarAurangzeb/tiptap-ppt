import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import React, { useEffect, useRef } from 'react'
import { allStyleAttributes } from '@/utils/styles'
import { useElementTracking } from '@/hooks/useElementTracking'

export const ShapeNode = Node.create({
    name: 'shape',
    group: 'block',
    atom: true,
    addAttributes() {
        return {
            ...allStyleAttributes,
            slideNumber: {
                default: null,
                parseHTML: (element: any) => element.getAttribute('slideNumber'),
                renderHTML: (attributes: any) => {
                    if (!attributes.slideNumber) {
                        return {}
                    }
                    return {
                        slideNumber: attributes.slideNumber
                    }
                }
            }
        }
    },
    parseHTML() {
        return [
            {
                tag: 'shape',
                getAttrs: (node: any) => ({
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
            'shape',
            {
                ...mergeAttributes(HTMLAttributes, {
                    style: styles.join('; ')
                }),
            },
            0
        ]
    },
    addNodeView() {
        return ReactNodeViewRenderer(ShapeNodeView as React.FC)
    },
})

const ShapeNodeView = (props: any) => {
    const {
        color,
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
    const { ref, elementId, parentContainerWidth } = useElementTracking({
        elementType: 'shape',
        node: props.node,
        getElementData: (elementId, slideNumber, coordinates) => {
            const currentNode = props.editor.state.doc.nodeAt(props.getPos());
            return {
                content: '',
                style: currentNode?.attrs || ''
            }
        }
    });

    const shapeStyle = {
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
        minHeight: '2px',
        minWidth: '1px',
    };

    return (
        <NodeViewWrapper as="div" ref={wrapperRef} className="relative inline-block w-full h-full overflow-hidden">
            <div
                ref={ref as any}
                style={shapeStyle}
                className="shape-element"
            />
        </NodeViewWrapper>
    );
}

export default ShapeNodeView 