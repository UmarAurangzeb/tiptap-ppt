import React from 'react'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import { useElementTracking } from '@/hooks/useElementTracking'

export default function BlockContainerNodeView({ node }: { node: any }) {
    const { width, height, backgroundColor } = node.attrs;
    const { ref, elementId, parentContainerWidth } = useElementTracking({
        elementType: 'shape',
        node,
        getElementData: (elementId, slideNumber, coordinates) => ({
            content: node.textContent || ''
        })
    });

    const containerStyle = {
        width: width || '',
        height: height || '',
        backgroundColor: backgroundColor || '',
    };

    return (
        <NodeViewWrapper
            ref={ref}
            data-element-id={elementId}
            className="block-container"
            style={containerStyle}
        >
            <NodeViewContent />
        </NodeViewWrapper>
    );
}
