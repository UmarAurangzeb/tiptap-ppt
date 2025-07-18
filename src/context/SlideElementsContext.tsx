"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react'

export type SlideElement = {
    id: string // unique identifier for each element
    slide_number: string
    type: 'paragraph' | 'heading' | 'shape' | 'image' | 'bullet' | 'svg' | 'icon'
    x: number
    y: number
    width: number
    height: number
    content: string
    textChunks: any[]
    // Shape-specific properties
    shapeType?: 'rectangle' | 'roundedRectangle'
    fillColor?: string
    borderColor?: string
    borderWidth?: number
    cornerRadius?: number
    // Styles object for detailed styling
    style?: {
        color?: string
        textAlign?: string
        fontWeight?: string
        fontSize?: string
        backgroundColor?: string
        borderColor?: string
        borderWidth?: string
        borderRadius?: string
        borderStyle?: string
        marginTop?: string
        marginBottom?: string
        marginLeft?: string
        marginRight?: string
        alignSelf?: string
        justifySelf?: string
        display?: string
        justifyContent?: string
        alignItems?: string
        flexDirection?: string
        position?: string
        width?: string
        height?: string
        // for bullet
        bulletColor?: string
    }
    setDisplayNone?: boolean
    // for image
    src?: string
    alt?: string
    // for bullet
    bulletText?: string


}

type SlideElementsContextType = {
    slideElements: Record<string, SlideElement[]> // organized by slide_number
    updateElement: (element: SlideElement) => void
    removeElement: (id: string, slide_number: string) => void
    getAllElements: () => SlideElement[]
    getElementsBySlide: (slide_number: string) => SlideElement[]
    removeElementsBySlide: (slide_number: string) => void
}

const SlideElementsContext = createContext<SlideElementsContextType | null>(null)

export const useSlideElements = () => {
    const context = useContext(SlideElementsContext)
    if (!context) {
        throw new Error('useSlideElements must be used within a SlideElementsProvider')
    }
    return context
}

export const SlideElementsProvider = ({ children }: { children: ReactNode }) => {
    const [slideElements, setSlideElements] = useState<Record<string, SlideElement[]>>({})

    const updateElement = React.useCallback((element: SlideElement) => {
        setSlideElements(prev => {
            const newState = { ...prev }

            // Initialize slide array if it doesn't exist
            if (!newState[element.slide_number]) {
                newState[element.slide_number] = []
            }

            // Find existing element or add new one
            const existingIndex = newState[element.slide_number].findIndex(el => el.id === element.id)

            if (existingIndex >= 0) {
                // Update existing element
                newState[element.slide_number][existingIndex] = element
            } else {
                // Add new element
                newState[element.slide_number].push(element)
            }
            console.log(' updated slide elements:', newState)
            return newState
        })
    }, [])

    const removeElement = React.useCallback((id: string, slide_number: string) => {
        setSlideElements(prev => {
            const newState = { ...prev }
            if (newState[slide_number]) {
                newState[slide_number] = newState[slide_number].filter(el => el.id !== id)
            }
            return newState
        })
    }, [])

    const removeElementsBySlide = React.useCallback((slide_number: string) => {
        setSlideElements(prev => {
            const newState = { ...prev }
            delete newState[slide_number]
            console.log("newState after removing slide:", slide_number, newState)
            return newState
        })
    }, [])

    const getAllElements = React.useCallback(() => {
        return Object.values(slideElements).flat()
    }, [slideElements])

    const getElementsBySlide = React.useCallback((slide_number: string) => {
        return slideElements[slide_number] || []
    }, [slideElements])

    return (
        <SlideElementsContext.Provider value={{
            slideElements,
            updateElement,
            removeElement,
            getAllElements,
            getElementsBySlide,
            removeElementsBySlide
        }}>
            {children}
        </SlideElementsContext.Provider>
    )
} 