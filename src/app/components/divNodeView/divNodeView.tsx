// DivNodeView.tsx
import React from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import { useElementTracking } from '@/hooks/useElementTracking';

export default function DivNodeView({ node }: any) {
    const { ref, elementId } = useElementTracking({
        elementType: 'shape',
        node,
        getElementData: (elementId, slideNumber, coords) => ({
            // Collect data like content, slide, position, etc.
        }),
    });

    return (
        <NodeViewWrapper ref={ref} data-element-id={elementId} className="w-full h-full">
            <NodeViewContent />
        </NodeViewWrapper>
    );
}
