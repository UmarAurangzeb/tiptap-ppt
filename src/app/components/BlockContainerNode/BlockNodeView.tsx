import React from 'react'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import { useElementTracking } from '@/hooks/useElementTracking'

export default function BlockContainerNodeView({ editor, node, getPos }: { editor: any, node: any, getPos: any }) {
    const { width, height, backgroundColor, borderWidth, borderStyle, borderColor, borderRadius, marginTop, marginBottom, marginLeft, marginRight, text, display, justifyContent, alignItems } = node.attrs;
    const { ref, elementId, parentContainerWidth } = useElementTracking({
        elementType: 'shape',
        node,
        getElementData: (elementId, slideNumber, coordinates) => {
            // Get the current node attributes at the time this function is called
            const currentNode = editor.state.doc.nodeAt(getPos());
            return {
                content: '',
                style: currentNode?.attrs || ''
            }
        }
    });

    const containerStyle = {
        width: width || '',
        height: height || '',
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
        justifyContent: justifyContent || '',
        alignItems: alignItems || '',
    };

    return (
        <NodeViewWrapper
            ref={ref}
            data-element-id={elementId}
            className={`block-container ${node.attrs.class || ''}`}
            style={containerStyle}
        >
            {node.attrs.text && <span>{node.attrs.text}</span>}
            <NodeViewContent />
        </NodeViewWrapper>
    );
}
