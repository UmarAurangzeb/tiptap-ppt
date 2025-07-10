import { useEffect, useRef, useState } from 'react'
import { useEditorDom } from '@/context/EditorContext'
import { useSlideElements, SlideElement } from '@/context/SlideElementsContext'

interface UseElementTrackingProps {
    elementType: 'paragraph' | 'heading' | 'shape' | 'image' | 'bullet'
    node: any
    getElementData: (elementId: string, slideNumber: string, coordinates: {
        x: number
        y: number
        width: number
        height: number
    }) => Partial<SlideElement>
}

export function useElementTracking({ elementType, node, getElementData }: UseElementTrackingProps) {
    const ref = useRef<HTMLDivElement>(null)
    const editorRef = useEditorDom()
    const { updateElement, removeElement } = useSlideElements()
    const [parentContainerWidth, setParentContainerWidth] = useState(1280)

    // Generate stable ID that persists across re-renders
    const elementIdRef = useRef<string>(`${elementType}-${Math.random().toString(36).substr(2, 9)}`)
    const elementId = elementIdRef.current

    useEffect(() => {
        const calculateDimensions = () => {
            if (ref.current && editorRef?.current) {
                const slideBody = ref.current.closest('.slide-body')
                const slide_number = slideBody?.getAttribute('n') || '0'
                if (slideBody) {
                    const parentRect = slideBody.getBoundingClientRect()
                    if (parentRect.width > 0 && parentRect.height > 0 && parentRect.x >= 0 && parentRect.y >= 0) {
                        // Update parent container width for responsive styling
                        setParentContainerWidth(prev => {
                            // console.log("parentRect.width", prev)
                            return parentRect.width
                        })

                        const nodeRect = ref.current.getBoundingClientRect()
                        const relativeX = nodeRect.x - parentRect.x
                        const relativeY = nodeRect.y - parentRect.y
                        if (nodeRect.width > 0 && nodeRect.height > 0 && relativeX >= 0 && relativeY >= 0) {
                            const coordinates = {
                                x: relativeX,
                                y: relativeY,
                                width: nodeRect.width,
                                height: nodeRect.height
                            }
                            const elementData = getElementData(elementId, slide_number, coordinates)
                            updateElement({
                                id: elementId,
                                slide_number: slide_number,
                                type: elementType,
                                x: relativeX,
                                y: relativeY,
                                width: nodeRect.width,
                                height: nodeRect.height,
                                content: '',
                                ...elementData
                            })
                        }
                    }
                }
            }
        }

        // Calculate dimensions on mount
        calculateDimensions()

        // Add resize event listener
        window.addEventListener('resize', calculateDimensions)

        // Watch for layout changes using ResizeObserver and MutationObserver
        let resizeObserver: ResizeObserver | null = null
        let mutationObserver: MutationObserver | null = null

        if (ref.current) {
            const slideBody = ref.current.closest('.slide-body')
            if (slideBody) {
                // Watch for size changes
                resizeObserver = new ResizeObserver(() => {
                    calculateDimensions()
                })
                resizeObserver.observe(slideBody)

                // Watch for any DOM changes within slide-body
                mutationObserver = new MutationObserver(() => {
                    calculateDimensions()
                })
                mutationObserver.observe(slideBody, {
                    childList: true,           // Watch for added/removed children
                    subtree: true,             // Watch changes in entire subtree
                    attributes: true,          // Watch for attribute changes (like class/style)
                    characterData: true,       // Watch for text content changes
                    attributeOldValue: true,   // Include old attribute values
                    characterDataOldValue: true // Include old text values
                })
            }
        }

        // Cleanup
        return () => {
            window.removeEventListener('resize', calculateDimensions)
            if (resizeObserver) {
                resizeObserver.disconnect()
            }
            if (mutationObserver) {
                mutationObserver.disconnect()
            }
        }
    }, [elementId, updateElement, editorRef, node.textContent])

    // Cleanup: remove element when component unmounts
    useEffect(() => {
        return () => {
            if (ref.current) {
                const slideBody = ref.current.closest('.slide-body')
                const slide_number = slideBody?.getAttribute('n') || '0'
                removeElement(elementId, slide_number)
            }
        }
    }, [elementId, removeElement])

    return {
        ref,
        elementId,
        parentContainerWidth
    }
} 