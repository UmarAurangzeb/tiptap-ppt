"use client"
import React, { useState } from 'react'
import { useSlideElements } from '@/context/SlideElementsContext'
import { exportToPowerPoint, debugSlideMappings, getSlideStatistics } from '@/utils/pptxExport'

export default function ExportButton() {
    const { slideElements } = useSlideElements()
    const [isExporting, setIsExporting] = useState(false)
    const [exportStatus, setExportStatus] = useState<string | null>(null)
    const [showDebug, setShowDebug] = useState(false)

    const handleExport = async () => {
        if (Object.keys(slideElements).length === 0) {
            setExportStatus('No slides to export')
            return
        }

        setIsExporting(true)
        setExportStatus('Exporting slides to PowerPoint...')

        try {
            const result = await exportToPowerPoint(slideElements)

            if (result.success) {
                setExportStatus(`✅ Successfully exported ${result.slideCount} slides: ${result.fileName}`)
            } else {
                setExportStatus(`❌ Export failed: ${result.error}`)
            }
        } catch (error) {
            setExportStatus(`❌ Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
        } finally {
            setIsExporting(false)
            // Clear status after 6 seconds
            setTimeout(() => setExportStatus(null), 6000)
        }
    }

    const handleDebugMapping = () => {
        console.log('🔍 Starting debug mapping...')
        debugSlideMappings(slideElements)
        setExportStatus('🔍 Debug mapping completed - check console for detailed coordinate mapping')
        setTimeout(() => setExportStatus(null), 4000)
    }

    const stats = getSlideStatistics(slideElements)

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="flex gap-3">
                <button
                    onClick={handleExport}
                    disabled={isExporting || stats.totalSlides === 0}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${isExporting
                        ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                        : stats.totalSlides === 0
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                        }`}
                >
                    {isExporting ? '⏳ Exporting...' : '📤 Export to PowerPoint'}
                </button>

                <button
                    onClick={() => setShowDebug(!showDebug)}
                    className="px-4 py-3 rounded-lg font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-200"
                >
                    {showDebug ? '🔍 Hide Debug' : '🔍 Debug'}
                </button>
            </div>

            {showDebug && (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm text-sm max-w-md">
                    <div className="flex gap-2 mb-3">
                        <button
                            onClick={handleDebugMapping}
                            className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs font-medium"
                        >
                            Show Coordinate Mapping
                        </button>
                    </div>
                    <div className="space-y-2 text-xs text-gray-600">
                        <div className="grid grid-cols-2 gap-2">
                            <div>📊 <strong>Stats:</strong></div>
                            <div></div>
                            <div>• Slides: {stats.totalSlides}</div>
                            <div>• Elements: {stats.totalElements}</div>
                            <div>• Paragraphs: {stats.totalParagraphs}</div>
                            <div>• Headers: {stats.totalHeaders}</div>
                            <div>• Shapes: {stats.totalShapes}</div>
                        </div>
                        <div className="border-t pt-2 mt-2">
                            <div>🎯 <strong>Mapping:</strong> Browser pixels → PowerPoint inches</div>
                            <div>📐 <strong>Aspect Ratio:</strong> 16:9 (13.33" × 7.5")</div>
                            <div>🔧 <strong>Font Scaling:</strong> Dynamic based on element size</div>
                        </div>
                    </div>
                </div>
            )}

            {exportStatus && (
                <div className={`text-sm px-4 py-2 rounded-lg border max-w-md text-center ${exportStatus.includes('✅')
                    ? 'bg-green-50 text-green-800 border-green-200'
                    : exportStatus.includes('❌')
                        ? 'bg-red-50 text-red-800 border-red-200'
                        : exportStatus.includes('🔍')
                            ? 'bg-purple-50 text-purple-800 border-purple-200'
                            : 'bg-blue-50 text-blue-800 border-blue-200'
                    }`}>
                    {exportStatus}
                </div>
            )}

            <div className="text-center">
                {stats.totalSlides > 0 ? (
                    <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-800">
                            📄 {stats.totalSlides} slides ready • 📝 {stats.totalElements} elements
                        </div>
                        <div className="text-xs text-gray-600">
                            {stats.totalHeaders} headers • {stats.totalParagraphs} paragraphs • {stats.totalShapes} shapes
                        </div>
                        <div className="text-xs text-green-600 font-medium">
                            ✨ Pixel-perfect 16:9 mapping
                        </div>
                    </div>
                ) : (
                    <div className="text-sm text-gray-400">
                        No slides detected - start creating content
                    </div>
                )}
            </div>
        </div>
    )
} 