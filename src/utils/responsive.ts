/**
 * Utility functions for responsive sizing calculations
 */

const BASE_WIDTH = 1280;

/**
 * Calculate responsive font size based on container width
 * @param baseSize - Base font size in pixels
 * @param containerWidth - Current container width
 * @returns Responsive font size as CSS string
 */
export const getResponsiveFontSize = (baseSize: number, containerWidth: number): string => {
    const responsiveSize = baseSize / (BASE_WIDTH / (containerWidth - 50));
    return `${responsiveSize}px`;
};

/**
 * Calculate responsive stroke/spacing width based on container width
 * @param baseValue - Base stroke/spacing value in pixels
 * @param containerWidth - Current container width
 * @returns Responsive stroke width as CSS string
 */
export const getResponsiveStrokeWidth = (baseValue: number, containerWidth: number): string => {
    const responsiveStroke = baseValue / (BASE_WIDTH / containerWidth);
    return `${responsiveStroke}px`;
};

/**
 * Calculate responsive value without unit (returns number)
 * @param baseValue - Base value in pixels
 * @param containerWidth - Current container width
 * @returns Responsive value as number
 */
export const getResponsiveValue = (baseValue: number, containerWidth: number): number => {
    return baseValue / (BASE_WIDTH / containerWidth);
};

/**
 * Calculate responsive value with custom base width
 * @param baseValue - Base value in pixels
 * @param containerWidth - Current container width
 * @param baseWidth - Custom base width (default: 1280)
 * @returns Responsive value as number
 */
export const getResponsiveValueWithBase = (
    baseValue: number,
    containerWidth: number,
    baseWidth: number = BASE_WIDTH
): number => {
    return baseValue / (baseWidth / containerWidth);
}; 