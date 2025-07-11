'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';

interface SlideDimensionsContextType {
    containerWidth: number;
    containerHeight: number;
}

const SlideDimensionsContext = createContext<SlideDimensionsContextType>({
    containerWidth: 1280,
    containerHeight: 720,
});

export function SlideDimensionsProvider({ children }: { children: React.ReactNode }) {
    const [dimensions, setDimensions] = useState({
        containerWidth: 1280,
        containerHeight: 720,
    });

    useEffect(() => {
        const updateDimensions = () => {
            // Get all slide bodies
            const slideBodies = document.querySelectorAll('.slide-body');

            if (slideBodies.length > 0) {
                // Use the first slide's dimensions as reference
                const rect = slideBodies[0].getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0) {
                    setDimensions({
                        containerWidth: rect.width,
                        containerHeight: rect.height,
                    });
                }
            }
        };

        // Initial calculation
        updateDimensions();

        // Set up resize observer for the entire document
        const resizeObserver = new ResizeObserver(updateDimensions);
        resizeObserver.observe(document.documentElement);

        // Regular resize listener as backup
        window.addEventListener('resize', updateDimensions);

        // Set up mutation observer to detect when slides are added
        const mutationObserver = new MutationObserver(updateDimensions);
        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });

        return () => {
            resizeObserver.disconnect();
            mutationObserver.disconnect();
            window.removeEventListener('resize', updateDimensions);
        };
    }, []);

    return (
        <SlideDimensionsContext.Provider value={dimensions}>
            {children}
        </SlideDimensionsContext.Provider>
    );
}

export const useSlideDimensions = () => useContext(SlideDimensionsContext); 