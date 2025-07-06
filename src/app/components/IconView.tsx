import React from 'react';
import { NodeViewWrapper, ReactNodeViewProps } from '@tiptap/react';

export default function IconView({ node }: ReactNodeViewProps) {
    const { query, loadImageId, 'ai-parsed-attrs': aiParsedAttrs } = node.attrs;

    // Parse the AI attributes if they exist
    let parsedAttrs = null;
    try {
        if (aiParsedAttrs) {
            parsedAttrs = JSON.parse(aiParsedAttrs);
        }
    } catch (error) {
        console.warn('Could not parse ai-parsed-attrs:', error);
    }

    return (
        <NodeViewWrapper className="icon-wrapper mb-4">
            <div
            // className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-2"
            >
                <div className="text-2xl text-blue-600">
                    {/* You can replace this with actual icon rendering logic */}
                    {query === 'brain' && '🧠'}
                    {query === 'language' && '💬'}
                    {query === 'palette' && '🎨'}
                    {query === 'tools' && '🔧'}
                    {!['brain', 'language', 'palette', 'tools'].includes(query) && '📌'}
                </div>
            </div>
            <div className="text-xs text-gray-500 text-center">
                {query && <div>Query: {query}</div>}
                {loadImageId && <div>ID: {loadImageId}</div>}
            </div>
        </NodeViewWrapper>
    );
} 