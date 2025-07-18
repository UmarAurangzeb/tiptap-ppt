'use client';
import { useEditor, EditorContent, BubbleMenu, ReactNodeViewRenderer, NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import { Text } from '@tiptap/extension-text';
import { Document } from '@tiptap/extension-document';
import { Paragraph } from '@tiptap/extension-paragraph';
import { useCallback, useEffect, useRef, useState } from 'react';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import FontFamily from '@tiptap/extension-font-family'
import { FontSize } from 'tiptap-extension-font-size';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image'
import NextImage from 'next/image'
import Heading from '@tiptap/extension-heading'
import { BulletList } from '@tiptap/extension-list'
import { ListItem } from '@tiptap/extension-list-item'
import { SmartLayout, SmartLayoutItem, Icon } from '@/app/components/SmartLayoutView'
import { EditorDomContext, getAllSlidesData } from '@/context/EditorContext'
import { DivNode } from '@/utils/divNode'
import { TitleSlide } from '@/app/components/TitleNodeViews/TitleSlideView'
import { renderHTML } from '@/variants/variants'
import { AccentImageNode, AccentImageContentNode } from '@/app/components/AccentImageNodeViews/AccentImageView'
import ParagraphView from '@/app/components/DefaultExtendedViews/ParagraphView'
import HeaderView from '@/app/components/DefaultExtendedViews/HeaderView'
import ImageView from '@/app/components/DefaultExtendedViews/ImageView'
import { Agenda } from '@/app/components/AgendaNodeViews/AgendaViews'
import { HeaderText } from '@/app/components/HeaderTextNodeViews/HeaderTextViews'
import { BlockContainerNode } from '@/utils/BlockContainerNode'
import { TextCardLayout } from '@/app/components/textCardNodeView/TextCardNodeView'
import { mergeAttributes } from '@tiptap/core'
import { CustomListItem } from '@/app/components/CustomListItemNodeView/CustomListItem'
import { ImageFormatNode } from './ImageFormatNodeView/imageformatNodeView';
import { CustomParagraph } from './DefaultExtendedViews/ParagraphView'
import { CustomHeader } from './DefaultExtendedViews/HeaderView'
import { customImage } from './DefaultExtendedViews/ImageView'
import { BulletListNode } from './BulletList/BulletListNodeView'
import { InfoCollectionNode } from './InfoCollectionNodeView/InfoCollectionNodeView'
import { ShapeNode } from './ShapeNodeView/ShapeNodeView'
import { SvgNode } from './SvgNodeView/SvgNodeView'
import { SectionBreakNode } from './SectionBreakNodeView/SectionBreakNodeView'
import { IconNode } from './IconNodeView/IconNode'
import { useSlideElements } from '@/context/SlideElementsContext'
import { TextStyle } from '@tiptap/extension-text-style'

export default function TiptapEditor() {
    const [isMounted, setIsMounted] = useState(false);
    const [backendHTMLContent, setBackendHTMLContent] = useState(`
<div class="slide-body" n="1">
<title-slide variant="imageTop" slideNumber="1">
<img u_id='title-image' src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d" alt="Mountain Landscape" />
<h1 u_id='title-header'  style="color: black; text-align: center; align-self: center; font-weight: bold;">this is the Title header</h1>
<p u_id='title-credit-line' style=" align-self: center; text-align: left;">credit line</p>
<p u_id='title-date' style=" align-self: center; text-align: right;">date</p>
</title-slide>
</div>

<div class="slide-body" n="2">
<agenda variant="bulletHeading" slideNumber="2">
<img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d" alt="Mountain Landscape" />
<block-container>
    <li bulletColor="#D9D9D9">
    <h1 u_id='agenda-item-1'>this is the header</h1>
    </li>
    <li bulletColor="#D9D9D9">
    <h1 u_id='agenda-item-2'>this is the header</h1>
    </li>
    <li bulletColor="#D9D9D9">
    <h1 u_id='agenda-item-3'>this is the header</h1>
    </li>
     <li bulletColor="#D9D9D9">
    <h1 u_id='agenda-item-4'>this is the header</h1>
    </li>
     <li bulletColor="#D9D9D9">
    <h1 u_id='agenda-item-5'>this is the header</h1>
    </li>
</block-container>
</div>

<div class="slide-body" n="3">
<section-break variant="SectionBreak1" slideNumber="3">
<block-container class="section-break-item" style="width: 100%; height: 100%; border-radius: 50%; background-color: #D9D9D9; display: flex; justify-content: center; align-items: center;">
<h1 u_id='section-break-item-1' style="text-align: center;">#1</h1>
</block-container>
<h1 u_id='section-break-item-2' style="text-align: center;">Section Title #1</h1>
</section-break>
</div>

<div class="slide-body" n="4">
<accentimage-layout variant="rightImage" slideNumber="4">
<img u_id='accent-image-img' src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d" alt="Mountain Landscape" />
<accentimage-content>
<h1 u_id='accent-image-header' style=" text-align: left;">this is the Accent Image header</h1>
<p u_id='accent-image-paragraph' style=" text-align: left;">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor sint eius eligendi quo itaque officia soluta odio beatae, sit, possimus enim ad, ex ea asperiores. Dignissimos excepturi tempora ipsa? Nobis.</p>
</accentimage-content>
</accentimage-layout>
</div>

<div class="slide-body" n="5">
<headertext-layout variant="leftHeader" slideNumber="5">
<block-container style="background-color: #D9D9D9; width: 100%; height: 100%;">
<h1 u_id='headertext-layout-header' style="text-align: left;">this is the header</h1>
</block-container>
<p u_id='headertext-layout-paragraph' style="text-align: left;">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor sint eius eligendi quo itaque officia soluta odio beatae, sit, possimus enim ad, ex ea asperiores. Dignissimos excepturi tempora ipsa? Nobis.</p>
</headertext-layout>
</div>

<div class="slide-body" n="6">
<image-format variant="imageFormat-rounded" slideNumber="6">
<img u_id='image-format-img-1' src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d" style='border-radius: 50%;' alt="Mountain Landscape" />
<img u_id='image-format-img-2' src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d" style='border-radius: 50%;' alt="Mountain Landscape" />
<img u_id='image-format-img-3' src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d" style='border-radius: 50%;' alt="Mountain Landscape" />
<block-container style="width: 100%; height: 100%;">
<h1 u_id='image-format-header-1' style="text-align: left;">this is the header</h1>
<p u_id='image-format-paragraph-1' style="text-align: left;">icia soluta odio beatae, sit, possimus enim ad, ex ea asperiores. Dignissimos excepturi tempora ipsa? Nobis.</p>
</block-container>
<block-container style="width: 100%; height: 100%;">
<h1 u_id='image-format-header-2' style="text-align: left;">this is the header</h1>
<p u_id='image-format-paragraph-2' style="text-align: left;">ue officia soluta odio beatae, sit, possimus enim ad, ex ea asperiores. Dignissimos excepturi tempora ipsa? Nobis.</p>
</block-container>
<block-container style="width: 100%; height: 100%;">
<h1 u_id='image-format-header-3' style="text-align: left;">this is the header</h1>
<p u_id='image-format-paragraph-3' style="text-align: left;">icia soluta odio beatae, sit, possimus enim ad, ex ea asperiores. Dignissimos excepturi tempora ipsa? Nobis.</p>
</block-container>
</image-format>
</div>

<div class="slide-body" n="7" >
<bullet-list variant="noImage" slideNumber="7">
<h1 u_id='bullet-list-header' style="text-align: left;">this is the header</h1>
<img u_id='bullet-list-img' src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d" alt="Mountain Landscape" />
<block-container class="unordered-list">
<li bulletColor="#D9D9D9"><p u_id='bullet-list-item-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos at recusandae assumenda libero asperiores rerum minus magnam totam iusto quis!</p></li>
<li bulletColor="#D9D9D9"><p u_id='bullet-list-item-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos at recusandae assumenda libem iusto quis!</p></li>
<li bulletColor="#D9D9D9"><p u_id='bullet-list-item-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos at r libero asperiores rerum minus magnam totam iusto quis!</p></li>
</block-container>
</bullet-list>
</div>

<div class="slide-body" n="8">
<text-card-layout variant="columns" slideNumber="8">
<h1 u_id='text-card-layout-header' style="text-align: left; ">this is the header</h1>
<block-container class="text-card-parent" style="width: 100%; height: 100%;">

<block-container class="text-card-content" style=" margin-right: 1%; width: 100%; height: 100%; ;">
<h2 u_id='text-card-content-header-1' style="text-align: left; ">text card header</h2>
<p u_id='text-card-content-paragraph-1' style="text-align:left; ">Lorem, ipsum dolor sit ipsum dolor sit amet consectetur adipisicing ipsum dolor sit amet consectetur adipisicing ipsum dolor sit amet consectetur adipisicing
</p>
</block-container>

<block-container class="text-card-content" style=" margin-right: 1%;  width: 100%; height: 100%; ">
<h2 u_id='text-card-content-header-2' style="text-align: left;">text card header</h2>
<p u_id='text-card-content-paragraph-2' style="text-align:left;">Lorem, ipsum dolor sit  ipsum dolor sit amet consectetur adipisicing  ipsum dolor sit amet consectetur adipisicing  ipsum dolor sit amet consectetur adipisicing
</p>
</block-container>

<block-container class="text-card-content" style=" margin-right: 1%;  width: 100%; height: 100%; ">
<h2 u_id='text-card-content-header-3' style="text-align: left;">text card header</h2>
<p u_id='text-card-content-paragraph-3' style="text-align:left;">Lorem, ipsum dolor sit  ipsum dolor sit amet consectetur adipisicing  ipsum dolor sit amet consectetur adipisicing  ipsum dolor sit amet consectetur adipisicing
</p>
</block-container>

</block-container>
</text-card-layout>
</div>

<div class="slide-body" n="9">
<info-collection variant="icon-text" slideNumber="9">
<h1 u_id='info-collection-header' style="text-align: center;">this is the header</h1>
<block-container style="width: 50%; height: 80%; background-color: #D9D9D9; border-radius: 50%;">
<icon iconName="fa-solid fa-star" iconColor="black"></icon>
</block-container>

<block-container style="width: 50%; height: 80%; background-color: #D9D9D9; border-radius: 50%;">
<icon iconName="fa-solid fa-star" iconColor="black"></icon>
</block-container>
<block-container style="width: 50%; height: 80%; background-color: #D9D9D9; border-radius: 50%;">
<icon iconName="fa-solid fa-star" iconColor="black"></icon>
</block-container>

<block-container style="width: 100%; height: 100%;">
<h1 u_id='info-item-header-1' style="text-align: center;">this is the header</h1>
<p u_id='info-item-paragraph-1' style="text-align: center;">icia soluta odio beatae, sit, possimus enim ad, ex ea asperiores. Dignissimos excepturi tempora ipsa? Nobis.</p>
</block-container>

<block-container style="width: 100%; height: 100%;">
<h1 u_id='info-item-header-2' style="text-align: center;">this is the header</h1>
<p u_id='info-item-paragraph-2' style="text-align: center;">icia soluta odio beatae, sit, possimus enim ad, ex ea asperiores. Dignissimos excepturi tempora ipsa? Nobis.</p>
</block-container>

<block-container style="width: 100%; height: 100%;">
<h1 u_id='info-item-header-3' style="text-align: center;">this is the header</h1>
<p u_id='info-item-paragraph-3' style="text-align: center;">icia soluta odio beatae, sit, possimus enim ad, ex ea asperiores. Dignissimos excepturi tempora ipsa? Nobis.</p>
</block-container>

<block-container setDisplayNone={true} style="width: 100%; height: 100%;">
<h1 u_id='info-item-header-4' style="text-align: center;">this is the header</h1>
<p u_id='info-item-paragraph-4' style="text-align: center;">icia soluta odio beatae, sit, possimus enim ad, ex ea asperiores. Dignissimos excepturi tempora ipsa? Nobis.</p>
</block-container>

</info-collection>
</div>


`
    );


    const editorRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>

    const { removeElementsBySlide } = useSlideElements()

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: false, // Disable the built-in bulletList to use our custom one
                listItem: false, // Disable the built-in listItem
            }),
            Bold,
            Italic,
            Underline,
            TextStyle,
            FontFamily.configure({ types: ['textStyle'] }),
            FontSize,
            CustomParagraph,
            CustomHeader,
            CustomHeader.configure({
                levels: [1, 2, 3, 4],
            }),
            BulletList.configure({
                HTMLAttributes: {
                    class: 'flex flex-col gap-1 list-none', // Remove default bullets since we're using custom ones
                },
            }),
            CustomListItem,
            customImage,
            ImageFormatNode,
            SmartLayout,
            SmartLayoutItem,
            Icon,
            DivNode,
            TitleSlide,
            AccentImageNode,
            AccentImageContentNode,
            Agenda,
            HeaderText,
            BlockContainerNode,
            TextCardLayout,
            BulletListNode,
            InfoCollectionNode,
            ShapeNode,
            SvgNode,
            SectionBreakNode,
            IconNode,
        ],
        content: ``,
        editorProps: {
            attributes: {
                class: '',
            },
        },
    });
    const variantMapRef = useRef<Map<string, string>>(new Map())
    let allNodes = ['titleSlide', 'accentImage', 'headerText', 'textCardLayout', 'imageFormat', 'bulletList', 'infoCollection', 'sectionBreak']
    const hasInitializedRef = useRef(false)
    useEffect(() => {
        if (!editor) return
        editor.on('transaction', ({ editor, transaction }) => {
            if (hasInitializedRef.current) return
            editor.state.doc.descendants((node, pos) => {
                const nodeType = node.type.name
                if (!allNodes.includes(nodeType)) return

                const variant = node.attrs.variant
                const slideNumber = node.attrs.slideNumber
                const key = `${nodeType}:${slideNumber}`

                variantMapRef.current.set(key, variant)
            })

            hasInitializedRef.current = true
        })
    }, [editor])


    editor?.on('update', ({ editor }) => {
        const variantMap = variantMapRef.current

        editor.state.doc.descendants((node, pos) => {
            const nodeType = node.type.name
            if (!allNodes.includes(nodeType)) {
                return
            }
            const variant = node.attrs.variant
            const slideNumber = node.attrs.slideNumber
            const key = `${nodeType}:${slideNumber}`

            const prevVariant = variantMap.get(key)

            if (prevVariant !== variant) {
                removeElementsBySlide(slideNumber)
                let content_level = getCurrentContent(node)
                console.log("content_level", content_level)
                ReplaceHTML(variant || '', prevVariant || '', nodeType, slideNumber, content_level)

                variantMap.set(key, variant)
            }
        })

    })


    const getCurrentContent = (node: any) => {
        const contentArr: any[] = []

        const processNode = (n: any) => {
            if (!n) return

            const nodeType = n.type?.name

            // Handle block-level elements
            if (['paragraph', 'heading'].includes(nodeType)) {
                const block: any = {
                    type: nodeType,
                    level: n.attrs?.level || null,
                    u_id: n.attrs?.u_id || null,
                    children: [],
                }
                n.content?.content?.forEach((child: any) => {
                    if (child.type.name === 'text') {
                        const marks: any = {}

                        child.marks?.forEach((mark: any) => {
                            if (mark.type.name === 'bold') marks.bold = true
                            if (mark.type.name === 'italic') marks.italic = true
                            if (mark.type.name === 'underline') marks.underline = true
                            if (mark.type.name === 'textStyle') {
                                if (mark.attrs?.fontSize) marks.fontSize = mark.attrs.fontSize
                                if (mark.attrs?.color) marks.color = mark.attrs.color
                                if (mark.attrs?.fontFamily) marks.fontFamily = mark.attrs.fontFamily
                            }
                        })

                        block.children.push({
                            text: child.text,
                            marks,
                        })
                    }
                })

                contentArr.push(block)
            }

            // Handle images
            if (nodeType === 'image') {
                contentArr.push({
                    type: 'image',
                    src: n.attrs?.src,
                    u_id: n.attrs?.u_id,
                })
            }

            // Recursively process nested content
            n.content?.content?.forEach(processNode)
        }

        processNode(node)
        return contentArr
    }


    // const getCurrentContent = (node: any) => {
    //     const contentArr: any = [];

    //     // Helper function to recursively process nodes
    //     const processNode = (n: any) => {
    //         if (!n) return;
    //         if (n.type && n.type.name) {
    //             if (n.type.name === 'heading') {
    //                 console.log("heading node", n)
    //                 contentArr.push({
    //                     type: 'heading',
    //                     content: n.textContent,
    //                     level: n.attrs.level
    //                 });
    //             } else if (n.type.name === 'paragraph') {
    //                 console.log("paragraph node", n)
    //                 contentArr.push({
    //                     type: 'paragraph',
    //                     content: n.textContent
    //                 });
    //             } else if (n.type.name === 'image') {
    //                 console.log("image node", n)
    //                 contentArr.push({
    //                     type: 'image',
    //                     content: n.attrs.src
    //                 });
    //             }
    //         }
    //         // If this node has children, process them recursively
    //         if (n.content && n.content.content && Array.isArray(n.content.content)) {
    //             n.content.content.forEach(processNode);
    //         }
    //     };

    //     processNode(node);
    //     return contentArr;
    // };

    const ReplaceHTML = (currentVariant: string, previousVariant: string | null, VariantType: string, slideNumber: string, content_level: any) => {

        const newSlideHTML = renderHTML(currentVariant, VariantType, slideNumber, content_level);
        setBackendHTMLContent(prevContent => {
            // Split the content into slides
            const slides = prevContent.split('</div>').filter(slide => slide.trim());

            // Find the index of the slide to replace
            const slideIndex = slides.findIndex(slide =>
                slide.includes(`<div class="slide-body" n="${slideNumber}"`)
            );

            if (slideIndex === -1) return prevContent;

            // Replace the slide
            slides[slideIndex] = newSlideHTML;

            // Join slides back together
            return slides.map(slide => slide + '</div>').join('\n\n');
        });

    }

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
            // console.log('Decoded HTML:', decodedHTML)
        }
    }, [editor, backendHTMLContent])

    //to store styles marks etc across render



    // Handle SSR by only rendering after component mounts
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="animate-pulse h-64 bg-gray-100 rounded-lg"></div>;
    }

    return (
        <EditorDomContext.Provider value={editorRef}>
            {/* <button onClick={() => {
                const slides = getAllSlidesData(editorRef, editor);
            }}>Get Slides</button> */}
            <div ref={editorRef} className="w-full  mx-auto  bg-gray-50 min-h-screen  rounded-lg">
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

                                {/* Italic Button */}
                                <button
                                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                                    className={`flex items-center justify-center w-8 h-8 rounded-md text-sm font-semibold transition-all duration-150 hover:bg-gray-100 active:bg-gray-200 ${editor?.isActive('italic') ? 'bg-gray-200 text-gray-800' : 'text-gray-600'
                                        }`}
                                    style={{ fontStyle: 'italic' }}
                                >
                                    I
                                </button>

                                {/* Underline Button */}
                                <button
                                    onClick={() => editor?.chain().focus().toggleUnderline().run()}
                                    className={`flex items-center justify-center w-8 h-8 rounded-md text-sm font-semibold transition-all duration-150 hover:bg-gray-100 active:bg-gray-200 ${editor?.isActive('underline') ? 'bg-gray-200 text-gray-800' : 'text-gray-600'
                                        }`}
                                    style={{ textDecoration: 'underline' }}
                                >
                                    U
                                </button>

                                {/* Divider */}
                                <div className="w-px h-6 bg-gray-300 mx-1"></div>

                                {/* Font Size Dropdown */}
                                {/* <select
                                    value={editor?.getAttributes('textStyle').fontSize || ''}
                                    onChange={(e) => editor?.chain().focus().setFontSize(e.target.value).run()}
                                    className="px-3 py-1.5 text-sm border border-gray-200 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer min-w-[70px]"
                                >
                                    <option value="12px">12px</option>
                                    <option value="14px">14px</option>
                                    <option value="16px">16px</option>
                                    <option value="18px">18px</option>
                                    <option value="20px">20px</option>
                                    <option value="24px">24px</option>
                                    <option value="28px">28px</option>
                                    <option value="32px">32px</option>
                                </select> */}

                                {/* Font Family Dropdown */}
                                <select
                                    value={editor?.getAttributes('textStyle').fontFamily || ''}
                                    onChange={(e) => editor?.chain().focus().setFontFamily(e.target.value).run()}
                                    className="px-3 py-1.5 text-sm border border-gray-200 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer min-w-[120px]"
                                >
                                    <option value="" disabled>Font Family</option>
                                    <option value="Arial">Arial</option>
                                    <option value="Roboto">Roboto</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Times New Roman">Times New Roman</option>
                                    <option value="Courier New">Courier New</option>
                                    <option value="Helvetica">Helvetica</option>
                                    <option value="Inter">Inter</option>
                                    <option value="Poppins">Poppins</option>
                                </select>
                            </div>
                        </BubbleMenu>
                    )
                }

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
            </div> */
}
