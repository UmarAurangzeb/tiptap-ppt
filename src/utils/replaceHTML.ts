// import { renderHTML } from '@/variants/variants'
// import { setBackendHTMLContent } from '@/context/EditorContext'
// export const ReplaceHTML = (currentVariant: string, previousVariant: string | null, VariantType: string, slideNumber: string) => {
//     if (previousVariant !== currentVariant) {
//         const newSlideHTML = renderHTML(currentVariant, VariantType, slideNumber);
//         setBackendHTMLContent(prevContent => {
//             // Split the content into slides
//             const slides = prevContent.split('</div>').filter(slide => slide.trim());

//             // Find the index of the slide to replace
//             const slideIndex = slides.findIndex(slide =>
//                 slide.includes(`<div class="slide-body" n="${slideNumber}"`)
//             );

//             if (slideIndex === -1) return prevContent;

//             // Replace the slide
//             slides[slideIndex] = newSlideHTML;

//             // Join slides back together
//             return slides.map(slide => slide + '</div>').join('\n\n');
//         });
//     }
// }
