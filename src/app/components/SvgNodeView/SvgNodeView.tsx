import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import React, { useEffect, useRef, useState } from 'react'
import { allStyleAttributes } from '@/utils/styles'
import { useElementTracking } from '@/hooks/useElementTracking'

export const SvgNode = Node.create({
    name: 'svg',
    group: 'block',
    atom: true,
    addAttributes() {
        return {
            ...allStyleAttributes,
            url: {
                default: '',
                parseHTML: (element: any) => element.getAttribute('src') || element.getAttribute('url') || '',
                renderHTML: (attributes: any) => {
                    if (!attributes.url) {
                        return {}
                    }
                    return {
                        src: attributes.url,
                        url: attributes.url
                    }
                }
            }
        }
    },
    parseHTML() {
        return [
            {
                tag: 'svg-node',
                getAttrs: (node: any) => ({
                    url: node.getAttribute('src') || node.getAttribute('url') || '',
                    color: node.style.color || null,
                    textAlign: node.style.textAlign || 'center',
                    fontWeight: node.style.fontWeight || 'bold',
                    alignSelf: node.style.alignSelf || 'center',
                    justifySelf: node.style.justifySelf || 'center',
                    marginLeft: node.style.marginLeft || '0',
                    marginRight: node.style.marginRight || '0',
                    backgroundColor: node.style.backgroundColor || '',
                    width: node.style.width || '100px',
                    height: node.style.height || '100px',
                    borderWidth: node.style.borderWidth || '',
                    borderStyle: node.style.borderStyle || '',
                    borderColor: node.style.borderColor || '',
                    borderRadius: node.style.borderRadius || '',
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
            'svg-node',
            {
                ...mergeAttributes(HTMLAttributes, {
                    style: styles.join('; '),
                    src: HTMLAttributes.url,
                    url: HTMLAttributes.url
                }),
            },
            0
        ]
    },
    addNodeView() {
        return ReactNodeViewRenderer(SvgNodeView as React.FC)
    },
})


function InlineSvg({ url, color }: { url: string; color: string }) {
    const [svgContent, setSvgContent] = useState<string>('')

    useEffect(() => {
        fetch(url)
            .then(res => res.text())
            .then(setSvgContent)
    }, [url])

    return (
        <div
            className="svg-wrapper"
            style={{ fill: color }}
            dangerouslySetInnerHTML={{ __html: svgContent }}
        />
    )
}

const SvgNodeView = (props: any) => {
    const {
        url,
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
    const svgStyle = {
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
        <NodeViewWrapper as="div" className="relative inline-block w-full h-full overflow-hidden">
            {url ? (
                <img
                    src={url}
                    alt="SVG"
                    style={svgStyle}
                    className="svg-element"
                />
            ) : (
                <div
                    style={{
                        ...svgStyle,
                        backgroundColor: '#f0f0f0',
                        border: '2px dashed #ccc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#666',
                        fontSize: '14px',
                        minHeight: '100px',
                        minWidth: '100px'
                    }}
                    className="svg-placeholder"
                >
                    No SVG URL provided
                </div>
            )}
        </NodeViewWrapper>
    );
}

export default SvgNodeView 