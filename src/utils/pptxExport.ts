import PptxGenJS from 'pptxgenjs'
import { SlideElement } from '@/context/SlideElementsContext'

// 16:9 aspect ratio PowerPoint dimensions (in inches)
const SLIDE_WIDTH = 13.33   // 16:9 aspect ratio width
const SLIDE_HEIGHT = 7.5    // 16:9 aspect ratio height

// Convert browser pixels to PowerPoint coordinates with precise mapping
function pixelsToPptUnits(pixels: number, containerSize: number, slideSize: number): number {
    // Convert pixels to relative position (0-1), then to PowerPoint units
    const relative = pixels / containerSize
    return relative * slideSize
}

// Get font size for PowerPoint based on element type and browser dimensions
function calculateFontSize(element: SlideElement, containerHeight: number): number {
    if (element.type === 'heading') {
        // For headers, calculate based on height ratio
        const heightRatio = element.height / containerHeight
        // Scale font size based on height ratio (typical header sizes)
        return Math.max(12, Math.min(36, Math.round(heightRatio * 200)))
    } else {
        // For paragraphs, use standard calculation
        const heightRatio = element.height / containerHeight
        return Math.max(10, Math.min(18, Math.round(heightRatio * 150)))
    }
}

// Get real slide container dimensions from DOM
export function getSlideContainerDimensions(): { width: number; height: number } {
    const slideBody = document.querySelector('.slide-body')
    if (slideBody) {
        const rect = slideBody.getBoundingClientRect()
        console.log('📐 Real slide dimensions:', { width: rect.width, height: rect.height })
        console.log('📐 Aspect ratio:', (rect.width / rect.height).toFixed(2))
        return {
            width: rect.width,
            height: rect.height
        }
    }
    console.warn('⚠️ Could not find .slide-body, using 16:9 fallback dimensions')
    // 16:9 fallback dimensions
    return {
        width: 1280,
        height: 720
    }
}

// Main export function with pixel-perfect mapping
export async function exportToPowerPoint(slideElements: Record<string, SlideElement[]>) {
    const containerDims = getSlideContainerDimensions()

    // Create new PowerPoint presentation with 16:9 aspect ratio
    const pptx = new PptxGenJS()

    // Set slide size to 16:9 aspect ratio
    pptx.defineLayout({ name: 'SLIDE_16x9', width: SLIDE_WIDTH, height: SLIDE_HEIGHT })
    pptx.layout = 'SLIDE_16x9'

    // Get all slide numbers and sort them
    const slideNumbers = Object.keys(slideElements).sort((a, b) => parseInt(a) - parseInt(b))

    console.log('🎯 Exporting with pixel-perfect mapping:')
    console.log('📐 Container dimensions:', containerDims)
    console.log('📐 PowerPoint dimensions:', { width: SLIDE_WIDTH, height: SLIDE_HEIGHT })
    console.log('📄 Slides to export:', slideNumbers.length)
    console.log('📝 Total elements:', Object.values(slideElements).flat().length)

    // Create a slide for each slide number
    for (const slideNumber of slideNumbers) {
        const elements = slideElements[slideNumber]
        if (!elements || elements.length === 0) continue

        // Create new slide
        const slide = pptx.addSlide()

        console.log(`\n📄 Creating slide ${slideNumber} with ${elements.length} elements`)

        // Sort elements by type for proper layering (shapes first as background, then text)
        const sortedElements = elements.sort((a, b) => {
            // Shapes go first (background)
            if (a.type === 'shape' && b.type !== 'shape') return -1
            if (a.type !== 'shape' && b.type === 'shape') return 1

            // Among text elements, headers first, then paragraphs
            if (a.type === 'heading' && b.type === 'paragraph') return -1
            if (a.type === 'paragraph' && b.type === 'heading') return 1

            // Finally sort by Y position
            return a.y - b.y
        })

        // Add each element to the slide
        for (const element of sortedElements) {
            // Convert browser coordinates to PowerPoint coordinates
            const pptX = pixelsToPptUnits(element.x, containerDims.width, SLIDE_WIDTH)
            const pptY = pixelsToPptUnits(element.y, containerDims.height, SLIDE_HEIGHT)
            const pptW = pixelsToPptUnits(element.width, containerDims.width, SLIDE_WIDTH)
            const pptH = pixelsToPptUnits(element.height, containerDims.height, SLIDE_HEIGHT)

            if (element.type === 'shape') {
                // Add shape to slide
                console.log(`🔳 Adding shape:`, {
                    browser: {
                        x: element.x,
                        y: element.y,
                        w: element.width,
                        h: element.height
                    },
                    ppt: {
                        x: pptX.toFixed(2),
                        y: pptY.toFixed(2),
                        w: pptW.toFixed(2),
                        h: pptH.toFixed(2)
                    },
                    fill: element.fillColor,
                    border: element.borderColor
                })

                // Convert corner radius from pixels to PowerPoint inches
                const cornerRadiusInches = element.cornerRadius
                    ? pixelsToPptUnits(element.cornerRadius || 8, containerDims.width, SLIDE_WIDTH)
                    : 0.1 // Default small radius

                slide.addShape('rect', {
                    x: Math.max(0, pptX),
                    y: Math.max(0, pptY),
                    w: Math.max(0.1, pptW),
                    h: Math.max(0.1, pptH),
                    fill: { color: element.fillColor || 'FFFFFF' },
                    line: {
                        color: element.borderColor || 'D1D5DB',
                        width: (element.borderWidth || 1) * 0.01 // Convert px to pt (rough conversion)
                    },
                    rectRadius: Math.min(cornerRadiusInches, 0.2) // Cap radius at 0.2 inches
                })

            } else if ((element.type === 'paragraph' || element.type === 'heading') && element.content.trim()) {
                // Add text to slide

                // Calculate font size based on element type and dimensions
                const fontSize = calculateFontSize(element, containerDims.height)

                // Determine text styling based on element type
                const isHeader = element.type === 'heading'
                const textOptions = {
                    x: Math.max(0, pptX),
                    y: Math.max(0, pptY),
                    w: Math.max(0.5, pptW),
                    h: Math.max(0.2, pptH),
                    fontSize: fontSize,
                    color: '000000',
                    fontFace: 'Arial',
                    align: 'left' as const,
                    valign: 'top' as const,
                    wrap: true,
                    autoFit: false,
                    margin: 0.02, // Small margin for text padding
                    bold: isHeader, // Headers are bold
                    // Add some spacing for headers
                    ...(isHeader && { margin: 0.05 })
                }

                console.log(`📝 Adding ${element.type}: "${element.content.substring(0, 40)}..."`, {
                    browser: {
                        x: element.x,
                        y: element.y,
                        w: element.width,
                        h: element.height
                    },
                    ppt: {
                        x: pptX.toFixed(2),
                        y: pptY.toFixed(2),
                        w: pptW.toFixed(2),
                        h: pptH.toFixed(2),
                        fontSize: fontSize
                    }
                })

                // Add text to slide
                slide.addText(element.content, textOptions)
            }
        }

        console.log(`✅ Slide ${slideNumber} completed`)
    }

    // Generate and download the PowerPoint file
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')
    const fileName = `slides-export-${timestamp[0]}-${timestamp[1].split('.')[0]}.pptx`

    try {
        await pptx.writeFile({ fileName })
        console.log('✅ PowerPoint file generated successfully:', fileName)
        return { success: true, fileName, slideCount: slideNumbers.length }
    } catch (error) {
        console.error('❌ Error generating PowerPoint file:', error)
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
}

// Debug function to preview the mapping
export function debugSlideMappings(slideElements: Record<string, SlideElement[]>) {
    const containerDims = getSlideContainerDimensions()

    console.log('🔍 DEBUG SLIDE MAPPINGS:')
    console.log('📐 Container dimensions:', containerDims)
    console.log('📐 PowerPoint dimensions:', { width: SLIDE_WIDTH, height: SLIDE_HEIGHT })
    console.log('📐 Aspect ratio browser:', (containerDims.width / containerDims.height).toFixed(2))
    console.log('📐 Aspect ratio PowerPoint:', (SLIDE_WIDTH / SLIDE_HEIGHT).toFixed(2))

    Object.entries(slideElements).forEach(([slideNumber, elements]) => {
        console.log(`\n📄 Slide ${slideNumber} (${elements.length} elements):`)

        elements.forEach((element, index) => {
            const pptX = pixelsToPptUnits(element.x, containerDims.width, SLIDE_WIDTH)
            const pptY = pixelsToPptUnits(element.y, containerDims.height, SLIDE_HEIGHT)
            const pptW = pixelsToPptUnits(element.width, containerDims.width, SLIDE_WIDTH)
            const pptH = pixelsToPptUnits(element.height, containerDims.height, SLIDE_HEIGHT)

            if (element.type === 'shape') {
                console.log(`  ${index + 1}. SHAPE: ${element.shapeType || 'rectangle'}`)
                console.log(`     Browser: x=${element.x}px, y=${element.y}px, w=${element.width}px, h=${element.height}px`)
                console.log(`     PowerPoint: x=${pptX.toFixed(2)}", y=${pptY.toFixed(2)}", w=${pptW.toFixed(2)}", h=${pptH.toFixed(2)}"`)
                console.log(`     Style: fill=${element.fillColor}, border=${element.borderColor}, radius=${element.cornerRadius}px`)
            } else if (element.type === 'paragraph' || element.type === 'heading') {
                const fontSize = calculateFontSize(element, containerDims.height)

                console.log(`  ${index + 1}. ${element.type.toUpperCase()}: "${element.content.substring(0, 30)}..."`)
                console.log(`     Browser: x=${element.x}px, y=${element.y}px, w=${element.width}px, h=${element.height}px`)
                console.log(`     PowerPoint: x=${pptX.toFixed(2)}", y=${pptY.toFixed(2)}", w=${pptW.toFixed(2)}", h=${pptH.toFixed(2)}", fontSize=${fontSize}`)
            }
        })
    })
}

// Utility function to get slide statistics
export function getSlideStatistics(slideElements: Record<string, SlideElement[]>) {
    const totalSlides = Object.keys(slideElements).length
    const allElements = Object.values(slideElements).flat()
    const totalElements = allElements.length
    const totalParagraphs = allElements.filter(el => el.type === 'paragraph').length
    const totalHeaders = allElements.filter(el => el.type === 'heading').length
    const totalShapes = allElements.filter(el => el.type === 'shape').length

    return {
        totalSlides,
        totalElements,
        totalParagraphs,
        totalHeaders,
        totalShapes,
        averageElementsPerSlide: totalElements / totalSlides || 0
    }
} 