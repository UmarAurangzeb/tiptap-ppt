"use client"
import React from 'react'
import { NodeViewWrapper, NodeViewContent, ReactNodeViewRenderer } from '@tiptap/react'
import { useElementTracking } from '@/hooks/useElementTracking'
import { getResponsiveFontSize, getResponsiveStrokeWidth } from '@/utils/responsive'
import Image from '@tiptap/extension-image'
import { allStyleAttributes } from '@/utils/styles'
export const customImage = Image.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            ...allStyleAttributes,
            setDisplayNone: {
                default: false
            }
        }
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
            'img',
            {
                ...HTMLAttributes,
                style: styles.length > 0 ? styles.join('; ') : undefined,
            },
        ];
    },
    parseHTML() {
        return [
            {
                tag: 'img',
                getAttrs: node => ({
                    setDisplayNone: node.getAttribute('setDisplayNone'),
                }),
            },
        ]
    },
    addNodeView() {
        return ReactNodeViewRenderer(ImageView)
    }
})


export default function ImageView({ editor, node, getPos }: { editor: any, node: any, getPos: any }) {
    const { ref, elementId, parentContainerWidth } = useElementTracking({
        elementType: 'image',
        node,
        getElementData: (elementId, slideNumber, coordinates) => {
            // Exclude src and alt from node.attrs
            const currentNode = editor.state.doc.nodeAt(getPos());
            currentNode.attrs.display = currentNode.attrs.setDisplayNone && currentNode.attrs.setDisplayNone === true ? 'none' : 'block';
            const { src, alt, setDisplayNone, ...styleAttrs } = currentNode?.attrs || {};
            // console.log("styleAttrs for image", styleAttrs)
            return {
                content: currentNode?.textContent || '',
                style: styleAttrs,
                src: src,
                alt: alt,
                setDisplayNone: setDisplayNone,
            };
        }
    })

    return (
        <NodeViewWrapper
            ref={ref}
            id={elementId}
            className="relative group w-full h-full"
        >
            {/* Actual editable header */}

            <NodeViewContent
                as="img"
                src={node.attrs.src}
                className=""
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover', /* ✅ Matches PowerPoint's "cover" behavior */
                    objectPosition: 'center',
                    borderRadius: node.attrs.borderRadius || '',
                    display: node.attrs.setDisplayNone && node.attrs.setDisplayNone === true ? 'none' : 'block',
                    color: node.attrs.color || '',
                    textAlign: node.attrs.textAlign || '',
                    fontWeight: node.attrs.fontWeight || '',
                    alignSelf: node.attrs.alignSelf || '',
                    marginLeft: node.attrs.marginLeft || '',
                    marginRight: node.attrs.marginRight || '',
                    justifySelf: node.attrs.justifySelf || '',
                    backgroundColor: node.attrs.backgroundColor || '',
                    borderWidth: node.attrs.borderWidth || '',
                    borderStyle: node.attrs.borderStyle || '',
                    borderColor: node.attrs.borderColor || '',
                    marginTop: node.attrs.marginTop || '',
                    marginBottom: node.attrs.marginBottom || '',
                }}
            />
        </NodeViewWrapper>
    )
} 