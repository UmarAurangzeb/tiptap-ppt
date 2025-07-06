'use client';
import { useEditor, EditorContent, BubbleMenu, ReactNodeViewRenderer } from '@tiptap/react';
import { Text } from '@tiptap/extension-text';
import { Document } from '@tiptap/extension-document';
import { Paragraph } from '@tiptap/extension-paragraph';
import { useCallback, useEffect, useRef, useState } from 'react';
import Bold from '@tiptap/extension-bold';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family'
import { FontSize } from 'tiptap-extension-font-size';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image'
import ParagraphView from './ParagraphView';
import Heading from '@tiptap/extension-heading'
import { SmartLayout, SmartLayoutItem, Icon } from '@/utils/SmartLayoutNode'
import { EditorDomContext, getAllSlidesData } from '@/context/EditorContext'
import { DivNode } from '@/utils/divNode'
import HeaderView from './HeaderView'
const CustomParagraph = Paragraph.extend({
    addNodeView() {
        return ReactNodeViewRenderer(ParagraphView)
    },
})

const CustomHeader = Heading.extend({
    addNodeView() {
        return ReactNodeViewRenderer(HeaderView)
    },
})

export default function TiptapEditor() {
    const [isMounted, setIsMounted] = useState(false);
    const [backendHTMLContent, setBackendHTMLContent] = useState(`
        id: 2
data: <section n="2" image-layout="blank" id="4s6w2m7cvog2cjn">
data:   
data:   
data: <div class="slide-body" n="1">
data: <h1>What Defines Us: Cognitive &amp; Cultural Uniqueness</h1>
data: <smart-layout variant="iconText"  shapesize="lg" imageposition="top" imagePosition="top">
data:     <smart-layout-item>
data:       <icon query="brain" ai-parsed-attrs="{&quot;loadImageParams&quot;:{&quot;provider&quot;:&quot;fontawesome&quot;,&quot;query&quot;:&quot;brain&quot;,&quot;options&quot;:{&quot;license&quot;:&quot;All&quot;}},&quot;source&quot;:&quot;image.icon&quot;,&quot;loadImageStatus&quot;:&quot;queued&quot;,&quot;loadImageId&quot;:&quot;EBsGr&quot;}"></icon>
data:       <h4>Advanced Cognition</h4>
data:       <p>
data:         Humans possess the largest neocortex relative to body size, enabling abstract thought, planning, and imagination beyond other species.
data:       </p>
data:     </smart-layout-item>
data:     <smart-layout-item>
data:       <icon query="language" ai-parsed-attrs="{&quot;loadImageParams&quot;:{&quot;provider&quot;:&quot;fontawesome&quot;,&quot;query&quot;:&quot;language&quot;,&quot;options&quot;:{&quot;license&quot;:&quot;All&quot;}},&quot;source&quot;:&quot;image.icon&quot;,&quot;loadImageStatus&quot;:&quot;queued&quot;,&quot;loadImageId&quot;:&quot;ZfsJZ&quot;}"></icon>
data:       <h4>Complex Language</h4>
data:       <p>
data:         Unique vocal anatomy and brain regions such as Broca's and Wernicke's areas empower diverse spoken, written, and signed languages.
data:       </p>
data:     </smart-layout-item>
data:     <smart-layout-item>
data:       <icon query="palette" ai-parsed-attrs="{&quot;loadImageParams&quot;:{&quot;provider&quot;:&quot;fontawesome&quot;,&quot;query&quot;:&quot;palette&quot;,&quot;options&quot;:{&quot;license&quot;:&quot;All&quot;}},&quot;source&quot;:&quot;image.icon&quot;,&quot;loadImageStatus&quot;:&quot;queued&quot;,&quot;loadImageId&quot;:&quot;a3hLU&quot;}"></icon>
data:       <h4>Symbolic Culture</h4>
data:       <p>
data:         The ability to create art, practice religion, and establish intricate social structures is key to human identity.
data:       </p>
data:     </smart-layout-item>
data:     <smart-layout-item>
data:       <icon query="tools" ai-parsed-attrs="{&quot;loadImageParams&quot;:{&quot;provider&quot;:&quot;fontawesome&quot;,&quot;query&quot;:&quot;tools&quot;,&quot;options&quot;:{&quot;license&quot;:&quot;All&quot;}},&quot;source&quot;:&quot;image.icon&quot;,&quot;loadImageStatus&quot;:&quot;queued&quot;,&quot;loadImageId&quot;:&quot;WMLrp&quot;}"></icon>
data:       <h4>Tool Use</h4>
data:       <p>
data:         Earliest stone tools date back 3.3 million years, e.g., Lomekwi 3 in Kenya, highlighting a long history of innovation.
data:       </p>
data:     </smart-layout-item>
data:   </smart-layout>
data: </div>
data: </section>
data:
   id: 2
data: <section n="2" image-layout="blank" id="4s6w2m7cvog2cjn">
data:   
data:   
data: <div class="slide-body" n="2">
data: <h1>What Defines Us: Cognitive &amp; Cultural Uniqueness</h1>
data: <smart-layout variant="imageText" shapesize="lg" imageposition="top" imagePosition="top">
data:     <smart-layout-item>
data:       <icon query="brain" ai-parsed-attrs="{&quot;loadImageParams&quot;:{&quot;provider&quot;:&quot;fontawesome&quot;,&quot;query&quot;:&quot;brain&quot;,&quot;options&quot;:{&quot;license&quot;:&quot;All&quot;}},&quot;source&quot;:&quot;image.icon&quot;,&quot;loadImageStatus&quot;:&quot;queued&quot;,&quot;loadImageId&quot;:&quot;EBsGr&quot;}"></icon>
data:       <h4>Advanced Cognition</h4>
data:       <p>
data:         Humans possess the largest neocortex relative to body size, enabling abstract thought, planning, and imagination beyond other species.
data:       </p>
data:     </smart-layout-item>
data:     <smart-layout-item>
data:       <icon query="language" ai-parsed-attrs="{&quot;loadImageParams&quot;:{&quot;provider&quot;:&quot;fontawesome&quot;,&quot;query&quot;:&quot;language&quot;,&quot;options&quot;:{&quot;license&quot;:&quot;All&quot;}},&quot;source&quot;:&quot;image.icon&quot;,&quot;loadImageStatus&quot;:&quot;queued&quot;,&quot;loadImageId&quot;:&quot;ZfsJZ&quot;}"></icon>
data:       <h4>Complex Language</h4>
data:       <p>
data:         Unique vocal anatomy and brain regions such as Broca's and Wernicke's areas empower diverse spoken, written, and signed languages.
data:       </p>
data:     </smart-layout-item>
data:     <smart-layout-item>
data:       <icon query="palette" ai-parsed-attrs="{&quot;loadImageParams&quot;:{&quot;provider&quot;:&quot;fontawesome&quot;,&quot;query&quot;:&quot;palette&quot;,&quot;options&quot;:{&quot;license&quot;:&quot;All&quot;}},&quot;source&quot;:&quot;image.icon&quot;,&quot;loadImageStatus&quot;:&quot;queued&quot;,&quot;loadImageId&quot;:&quot;a3hLU&quot;}"></icon>
data:       <h4>Symbolic Culture</h4>
data:       <p>
data:         The ability to create art, practice religion, and establish intricate social structures is key to human identity.
data:       </p>
data:     </smart-layout-item>
data:     <smart-layout-item>
data:       <icon query="tools" ai-parsed-attrs="{&quot;loadImageParams&quot;:{&quot;provider&quot;:&quot;fontawesome&quot;,&quot;query&quot;:&quot;tools&quot;,&quot;options&quot;:{&quot;license&quot;:&quot;All&quot;}},&quot;source&quot;:&quot;image.icon&quot;,&quot;loadImageStatus&quot;:&quot;queued&quot;,&quot;loadImageId&quot;:&quot;WMLrp&quot;}"></icon>
data:       <h4>Tool Use</h4>
data:       <p>
data:         Earliest stone tools date back 3.3 million years, e.g., Lomekwi 3 in Kenya, highlighting a long history of innovation.
data:       </p>
data:     </smart-layout-item>
data:   </smart-layout>
data: </div>
data: </section>
data:
`);
    const editorRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>
    const editor = useEditor({
        extensions: [
            StarterKit, // includes Document, Paragraph, Text
            TextStyle,
            FontFamily.configure({ types: ['textStyle'] }),
            FontSize,
            Image.configure({
                inline: true,
                allowBase64: true,
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded-lg shadow-sm',
                },
            }),
            CustomParagraph,
            CustomHeader,
            CustomHeader.configure({
                levels: [1, 2, 3, 4],
            }),
            SmartLayout,
            SmartLayoutItem,
            Icon,
            DivNode,
        ],
        content: ``,
        editorProps: {
            attributes: {
                class: '',
            },
        },
    });

    useEffect(() => {
        if (editor && backendHTMLContent) {
            const cleanHTML = backendHTMLContent
                .split('\n')
                .filter(line => line.trim().startsWith('<') || line.trim().startsWith('data:'))
                .map(line => line.replace(/^data:\s?/, ''))
                .join('\n')

            // Decode HTML entities like &quot; to "
            const decodedHTML = cleanHTML
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&#39;/g, "'")

            editor.commands.setContent(decodedHTML, false)
            console.log('Decoded HTML:', decodedHTML)
        }
    }, [editor, backendHTMLContent])

    // const addImage = useCallback(() => {
    //     const url = window.prompt('Enter image URL:', 'https://example.com/image.jpg')

    //     if (url) {
    //         // Basic URL validation
    //         try {
    //             new URL(url)
    //             editor?.chain().focus().setImage({
    //                 src: url,
    //                 alt: 'Image',
    //                 title: 'Image'
    //             }).run()
    //         } catch (error) {
    //             alert('Please enter a valid URL')
    //         }
    //     }
    // }, [editor])



    // Handle SSR by only rendering after component mounts
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="animate-pulse h-64 bg-gray-100 rounded-lg"></div>;
    }

    return (
        <EditorDomContext.Provider value={editorRef}>
            <button onClick={() => {
                const slides = getAllSlidesData(editorRef, editor);
            }}>Get Slides</button>
            <div ref={editorRef} className="w-full max-w-6xl mx-auto  bg-gray-50 min-h-screen">
                {
                    editor && (
                        <BubbleMenu
                            editor={editor}
                            tippyOptions={{
                                duration: 100,
                                placement: 'top',
                                arrow: false,
                                theme: 'light-border',
                                interactive: true,
                                appendTo: 'parent'
                            }}
                        >
                            <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg shadow-lg p-1 backdrop-blur-sm">
                                {/* Bold Button */}
                                <button
                                    onClick={() => editor?.chain().focus().toggleBold().run()}
                                    className={`flex items-center justify-center w-8 h-8 rounded-md text-sm font-semibold transition-all duration-150 hover:bg-gray-100 active:bg-gray-200 ${editor?.isActive('bold') ? 'bg-gray-200 text-gray-800' : 'text-gray-600'
                                        }`}
                                >
                                    B
                                </button>

                                {/* Divider */}
                                <div className="w-px h-6 bg-gray-300 mx-1"></div>

                                {/* Font Size Dropdown */}
                                <select
                                    onChange={(e) => editor?.chain().focus().setFontSize(e.target.value).run()}
                                    className="px-3 py-1.5 text-sm border border-gray-200 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer min-w-[70px]"
                                    defaultValue="16px"
                                >
                                    <option value="12px">12px</option>
                                    <option value="14px">14px</option>
                                    <option value="16px">16px</option>
                                    <option value="18px">18px</option>
                                    <option value="20px">20px</option>
                                    <option value="24px">24px</option>
                                    <option value="28px">28px</option>
                                    <option value="32px">32px</option>
                                </select>

                                {/* Font Family Dropdown */}
                                <select
                                    onChange={(e) => editor?.chain().focus().setFontFamily(e.target.value).run()}
                                    className="px-3 py-1.5 text-sm border border-gray-200 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer min-w-[120px]"
                                    defaultValue=""
                                >
                                    <option value="" disabled>Font Family</option>
                                    <option value="Arial">Arial</option>
                                    <option value="Roboto">Roboto</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Times New Roman">Times New Roman</option>
                                    <option value="Courier New">Courier New</option>
                                    <option value="Helvetica">Helvetica</option>
                                    <option value="Inter">Inter</option>
                                </select>
                            </div>
                        </BubbleMenu>
                    )}

                <EditorContent editor={editor} />


            </div>
        </EditorDomContext.Provider>
    );
}


{/* Toolbar
            <div className="flex items-center gap-2 mt-4 p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                <button
                    onClick={addImage}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                    🖼️ Add Image
                </button>
                <span className="text-sm text-gray-500">
                    Click to add an image via URL, or select text to use the bubble menu
                </span>
            </div> */}