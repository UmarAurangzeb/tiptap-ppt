import React from 'react'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import { useElementTracking } from '@/hooks/useElementTracking'

export default function BlockContainerNodeView({ node }: { node: any }) {
    const { width, height, backgroundColor, borderWidth, borderStyle, borderColor, borderRadius, marginTop, marginBottom, marginLeft, marginRight } = node.attrs;
    const { ref, elementId, parentContainerWidth } = useElementTracking({
        elementType: 'shape',
        node,
        getElementData: (elementId, slideNumber, coordinates) => ({
            content: '',
            style: node.attrs || ''
        })
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
    };

    return (
        <NodeViewWrapper
            ref={ref}
            data-element-id={elementId}
            className={`block-container ${node.attrs.class || ''}`}
            style={containerStyle}
        >
            <NodeViewContent />
        </NodeViewWrapper>
    );
}
