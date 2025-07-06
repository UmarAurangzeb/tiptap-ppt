"use client"
import React, { useEffect, useRef, useState } from 'react'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import { useEditorDom } from '@/context/EditorContext'
import { useSlideElements } from '@/context/SlideElementsContext'

export default function SmartLayoutItemView({ editor, node, getPos }: { editor: any, node: any, getPos: any }) {
    const ref = useRef<HTMLDivElement>(null)
    const editorRef = useEditorDom()
    const { updateElement, removeElement } = useSlideElements()

    // Generate stable ID that persists across re-renders
    const elementIdRef = useRef<string>(`shape-${Math.random().toString(36).substr(2, 9)}`)
    const elementId = elementIdRef.current

    useEffect(() => {
        const calculateDimensions = () => {
            if (ref.current && editorRef?.current) {
                const slideBody = ref.current.closest('.slide-body')
                const slide_number = slideBody?.getAttribute('n') || '0'
                if (slideBody) {
                    const parentRect = slideBody.getBoundingClientRect()
                    if (parentRect.width > 0 && parentRect.height > 0 && parentRect.x >= 0 && parentRect.y >= 0) {
                        const nodeRect = ref.current.getBoundingClientRect()
                        const relativeX = nodeRect.x - parentRect.x
                        const relativeY = nodeRect.y - parentRect.y
                        if (nodeRect.width > 0 && nodeRect.height > 0 && relativeX >= 0 && relativeY >= 0) {
                            console.log("coordinates of shape:", {
                                slide_number: slide_number,
                                x: relativeX,
                                y: relativeY,
                                width: nodeRect.width,
                                height: nodeRect.height,
                            })
                            updateElement({
                                id: elementId,
                                slide_number: slide_number,
                                type: 'shape',
                                x: relativeX,
                                y: relativeY,
                                width: nodeRect.width,
                                height: nodeRect.height,
                                content: '', // Shapes don't have text content
                                shapeType: 'roundedRectangle',
                                fillColor: 'FFFFFF', // White background
                                borderColor: 'D1D5DB', // Gray-300 border
                                borderWidth: 1,
                                cornerRadius: 8 // Rounded corners (lg = 8px)
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
    }, [elementId, updateElement, editorRef])

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

    const selectShape = () => {
        const from = getPos()
        console.log("getting starting position", from)
        const to = from + node.nodeSize
        console.log("shape node", node)
        console.log("shape node size", node.nodeSize)
        console.log("getting ending position", to)
        const transaction = editor.state.tr.setSelection(
            //select everything in the shape between from and to
            editor.state.selection.constructor.create(editor.state.doc, from, to)
        )
        editor.view.dispatch(transaction)
        editor.view.focus()
    }

    return (
        <NodeViewWrapper ref={ref} as='div' className="w-full p-2 box-border h-full relative group">
            {/* Shape selection button */}
            <div
                className="absolute left-1 top-1 bg-gray-200 opacity-0 group-hover:opacity-100 cursor-pointer p-1 text-black hover:bg-gray-300 rounded z-10"
                onClick={selectShape}
                title="Select shape"
            >
                ⋮
            </div>
            <div className="bg-white h-full w-full px-2 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center justify-center text-center gap-4">
                <NodeViewContent />
            </div>
        </NodeViewWrapper>
    );
}
