import { createContext, useContext } from 'react'

export const EditorDomContext = createContext<React.RefObject<HTMLDivElement> | null>(null)
export const useEditorDom = () => useContext(EditorDomContext)

export function getAllSlidesData(editorRef: React.RefObject<HTMLDivElement>, editor: any) {
    if (!editorRef?.current) return [];
    // console.log("editorRef", editorRef.current);
    const $slideBodies = editor.$doc.querySelectorAll('divNode', { class: 'slide-body' });
    console.log("slideBodies", $slideBodies);
    // return $slideBodies.map(($slide: any, index: number) => {
    //     return {
    //         index,
    //         nodePos: $slide,
    //         // Access the actual DOM element
    //         element: $slide.element,
    //         // Get positioning data
    //         bounds: $slide.element.getBoundingClientRect(),
    //         // Get slide content
    //         content: $slide.content,
    //         // Get attributes
    //         attributes: $slide.attributes
    //     };
    // });
    const slideElements = editorRef.current.querySelectorAll('.slide-body');
    return Array.from(slideElements).map((element, index) => {
        const rect = element.getBoundingClientRect();
        console.log("index", index, "slideX", rect.x, "slideY", rect.y);
        return {
            index,
            slideX: rect.x,
            slideY: rect.y
        };
    });
}