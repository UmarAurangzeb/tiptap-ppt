import PptxGenJS from 'pptxgenjs'
import { SlideElement } from '@/context/SlideElementsContext'
import * as htmlToImage from 'html-to-image'

// 16:9 aspect ratio PowerPoint dimensions (in inches)
const SLIDE_WIDTH = 13.33   // 16:9 aspect ratio width
const SLIDE_HEIGHT = 7.5    // 16:9 aspect ratio height

function pixelsToPptUnits(pixels: number, containerSize: number, slideSize: number): number {
    const relative = pixels / containerSize
    return relative * slideSize
}

// Replace percentToInches with a browser-accurate margin conversion
function percentMarginToPptUnits(percentStr: string, containerPx: number, slideInches: number): number {
    if (!percentStr || percentStr.length === 0) return 0
    const percent = parseFloat(percentStr.replace('%', '')) / 100
    const px = percent * containerPx
    return pixelsToPptUnits(px, containerPx, slideInches)
}

// Convert responsive pixel font size to PowerPoint font size
function convertFontSizeToPoints(pixelSize: number, containerWidth: number): number {
    const baseContainerWidth = 1280
    const scaleFactor = containerWidth / baseContainerWidth

    const pointSize = pixelSize * 0.75

    return pointSize / scaleFactor
}

// Parse font size from CSS string (e.g., "23.1px" -> 23.1)
function parseFontSize(fontSize: string): number {
    if (!fontSize) return 12
    let fontsize = fontSize.replace('px', '')
    let px = parseFloat(fontsize)
    return px
}



function cssColorToHex(color: string | undefined): string {
    if (!color || color.length === 0) return 'none'
    const ctx = document.createElement('canvas').getContext('2d')
    if (!ctx) return 'none'
    ctx.fillStyle = color
    return ctx.fillStyle.replace('#', '')
}

// Get real slide container dimensions from DOM
export function getSlideContainerDimensions(): { width: number; height: number } {
    const slideBody = document.querySelector('.slide-body')
    if (slideBody) {
        const rect = slideBody.getBoundingClientRect()
        // console.log('📐 Real slide dimensions:', { width: rect.width, height: rect.height })
        // console.log('📐 Aspect ratio:', (rect.width / rect.height).toFixed(2))
        console.log("width", rect.width)
        console.log("height", rect.height)
        return {
            width: rect.width,
            height: rect.height
        }
    }

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

    pptx.defineLayout({ name: 'SLIDE_16x9', width: SLIDE_WIDTH, height: SLIDE_HEIGHT })
    pptx.layout = 'SLIDE_16x9'

    // Get all slide numbers and sort them
    const slideNumbers = Object.keys(slideElements).sort((a, b) => parseInt(a) - parseInt(b))



    for (const slideNumber of slideNumbers) {
        const elements = slideElements[slideNumber]
        if (!elements || elements.length === 0) continue

        // Create new slide
        const slide = pptx.addSlide()

        console.log(`\n📄 Creating slide ${slideNumber} with ${elements.length} elements`)

        // Sort elements by type for proper layering (shapes first as background, then images, then text)

        const getPriority = (type: string): number => {
            switch (type) {
                case 'svg': return 0       // Highest priority
                case 'shape': return 1
                case 'image': return 2
                case 'heading': return 3
                case 'paragraph': return 4
                default: return 5
            }
        }

        const sortedElements = elements.sort((a, b) => {
            const priorityA = getPriority(a.type)
            const priorityB = getPriority(b.type)

            if (priorityA !== priorityB) return priorityA - priorityB

            // If same priority, sort by y-position
            return a.y - b.y
        })

        // const sortedElements = elements.sort((a, b) => {
        //     // Shapes go first (background)
        //     //svg should render before shapes and images
        //     if (a.type === 'svg' && b.type !== 'svg') return -1

        //     if (a.type === 'shape' && b.type !== 'shape') return -1
        //     if (a.type !== 'shape' && b.type === 'shape') return 1

        //     // Images go after shapes but before text
        //     if (a.type === 'image' && b.type !== 'image') {
        //         if (b.type === 'heading' || b.type === 'paragraph') return -1
        //     }
        //     if (b.type === 'image' && a.type !== 'image') {
        //         if (a.type === 'heading' || a.type === 'paragraph') return 1
        //     }

        //     // Among text elements, headers first, then paragraphs
        //     if (a.type === 'heading' && b.type === 'paragraph') return -1
        //     if (a.type === 'paragraph' && b.type === 'heading') return 1

        //     // Finally sort by Y position
        //     return a.y - b.y
        // })

        // Add each element to the slide
        for (const element of sortedElements) {
            // Convert browser coordinates to PowerPoint coordinates
            const pptX = pixelsToPptUnits(element.x, containerDims.width, SLIDE_WIDTH)
            const pptY = pixelsToPptUnits(element.y, containerDims.height, SLIDE_HEIGHT)
            const pptW = pixelsToPptUnits(element.width, containerDims.width, SLIDE_WIDTH)
            const pptH = pixelsToPptUnits(element.height, containerDims.height, SLIDE_HEIGHT)



            if (element.type === 'shape') {

                const backgroundColor = element.style?.backgroundColor
                const isBlockContainer = element.style?.display === 'block' || element.style?.display === 'flex'

                if (isBlockContainer && (!backgroundColor || backgroundColor === 'transparent' || backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === '')) {
                    continue
                }
                if (element.style?.borderRadius === '50%') {
                    const size = Math.min(pptW, pptH) // make it square
                    slide.addShape(pptx.ShapeType.ellipse, {
                        x: Math.max(0, pptX),
                        y: Math.max(0, pptY),
                        w: Math.max(0.1, size),
                        h: Math.max(0.1, size),
                        fill: { color: cssColorToHex(element.style?.backgroundColor) },
                    })
                } else {
                    slide.addShape('rect', {
                        x: Math.max(0, pptX),
                        y: Math.max(0, pptY),
                        w: Math.max(0.1, pptW),
                        h: Math.max(0.1, pptH),
                        fill: { color: cssColorToHex(backgroundColor) },
                    })
                }




            }
            else if (element.type === 'bullet') {
                let BulletFontSizeppt = convertFontSizeToPoints(element.bulletfontSize, containerDims.width)
                slide.addShape(pptx.ShapeType.ellipse, {
                    x: Math.max(0, pptX),
                    y: Math.max(0, pptY),
                    w: Math.max(0.1, pptW),
                    h: Math.max(0.1, pptH),
                    fill: { color: cssColorToHex(element.style?.bulletColor) },
                });
                if (element.bulletText) {
                    slide.addText(element.bulletText, {
                        x: Math.max(0, pptX),
                        y: Math.max(0, pptY) + 0.02, // adjust to center vertically
                        w: Math.max(0.1, pptW),
                        h: Math.max(0.1, pptH),
                        align: 'center',
                        valign: 'middle',
                        fontSize: BulletFontSizeppt,
                        color: '000000',
                    });
                }
            }

            else if (element.type === 'image' && element.src) {
                // Add image to slide
                try {
                    console.log("element.style?.display", element.style?.display)

                    const imageNode = document.getElementById(element.id)
                    if (imageNode) {
                        const pngDataUrl = await htmlToImage.toPng(imageNode)
                        slide.addImage({
                            data: pngDataUrl,
                            x: Math.max(0, pptX),
                            y: Math.max(0, pptY),
                            w: Math.max(0.5, pptW),
                            h: Math.max(0.3, pptH),
                            sizing: {
                                type: 'cover',
                                w: Math.max(0.5, pptW),
                                h: Math.max(0.3, pptH)
                            }
                        })
                        // if (element.setDisplayNone !== true) {
                        //     slide.addImage({
                        //         path: element.src,
                        //         x: Math.max(0, pptX),
                        //         y: Math.max(0, pptY),
                        //         w: Math.max(0.5, pptW),
                        //         h: Math.max(0.3, pptH),
                        //         sizing: {
                        //             type: 'cover',
                        //             w: Math.max(0.5, pptW),
                        //             h: Math.max(0.3, pptH)
                        //         }
                        //     })
                        // }
                    }
                } catch (error) {
                    console.warn(`⚠️ Could not add image: ${element.src}`, error)
                }
            } else if (element.type === 'heading') {
                let parsedFontSize = parseFontSize(element.style?.fontSize || '0px')
                let pptFontSize = convertFontSizeToPoints(parsedFontSize, containerDims.width)
                const textOptions = {
                    x: Math.max(0, pptX),
                    y: Math.max(0, pptY) + 0.15,
                    w: Math.max(0.5, pptW),
                    h: Math.max(0.2, pptH),
                    fontSize: pptFontSize - 4,
                    color: cssColorToHex(element.style?.color || '000000'),
                    fontFace: 'Arial',
                    lineWrap: false,
                    autoFit: true,
                    align: (element.style?.textAlign || 'left') as 'left' | 'center' | 'right',
                    bold: element.style?.fontWeight === 'bold' || false,
                    margin: 0
                }
                slide.addText(element.content, textOptions)
            }
            else if (element.type === 'paragraph') {
                let parsedFontSize = parseFontSize(element.style?.fontSize || '0px')
                let pptFontSize = convertFontSizeToPoints(parsedFontSize, containerDims.width)

                // const marginLeft = element.style?.marginLeft && percentMarginToPptUnits(element.style.marginLeft, containerDims.width, SLIDE_WIDTH)
                // const marginRight = element.style?.marginRight && percentMarginToPptUnits(element.style.marginRight, containerDims.width, SLIDE_WIDTH)
                // const marginTop = element.style?.marginTop && percentMarginToPptUnits(element.style.marginTop, containerDims.height, SLIDE_HEIGHT)
                // const marginBottom = element.style?.marginBottom && percentMarginToPptUnits(element.style.marginBottom, containerDims.height, SLIDE_HEIGHT)


                // const overallXmargin = (marginLeft || 0) - (marginRight || 0)
                // const overallYmargin = (marginTop || 0) - (marginBottom || 0)

                const textOptions = {
                    x: Math.max(0, pptX),
                    y: Math.max(0, pptY),
                    w: Math.max(0.5, pptW),
                    h: Math.max(0.2, pptH),
                    color: cssColorToHex(element.style?.color || '000000'),
                    fontSize: pptFontSize,
                    fontFace: 'Arial',
                    align: (element.style?.textAlign || 'left') as 'left' | 'center' | 'right',
                    autoFit: true,
                    bold: element.style?.fontWeight === 'bold' || false,
                }
                slide.addText(element.content, textOptions)
            }
            else if (element.type === 'icon') {

                const iconNode = document.getElementById(element.id)
                // console.log("iconNode", iconNode)
                if (iconNode) {
                    const pngDataUrl = await htmlToImage.toPng(iconNode)
                    slide.addImage({
                        data: pngDataUrl,
                        x: Math.max(0, pptX - 0.2),
                        y: Math.max(0, pptY),
                        w: Math.max(0.1, pptW),
                        h: Math.max(0.1, pptH),
                    })
                }

            }
            else if (element.type === 'svg') {
                const svgNode = document.getElementById(element.id)
                if (svgNode) {
                    const pngDataUrl = await htmlToImage.toPng(svgNode)
                    slide.addImage({
                        data: pngDataUrl,
                        x: Math.max(0, pptX - 0.2),
                        y: Math.max(0, pptY),
                        w: Math.max(0.1, pptW),
                        h: Math.max(0.1, pptH),
                    })
                }
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
                // const fontSize = calculateFontSize(element, containerDims.height)

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