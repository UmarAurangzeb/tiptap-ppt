type VariantElement = {
    type: 'image' | 'heading' | 'paragraph' | 'shape'
    content: string
    name?: string
    attributes?: {
        color?: string
        'text-align'?: string
        'font-weight'?: string
        'align-self'?: string
        'justify-self'?: string
        'margin-left'?: string
        'margin-right'?: string
    }
}

// type SlideVariant = {
//     type: 'titleSlide'
//     name: string
//     elements: VariantElement[]
// }

export const SlideVariants = [
    {
        type: 'titleSlide',
        variants: [
            {
                name: 'imageTop',
                elements: [
                    {
                        type: 'image',
                        content: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d'
                    },
                    {
                        type: 'heading',
                        name: 'title',
                        content: 'this is the Title header',
                        attributes: {
                            color: 'blue',
                            'text-align': 'center',
                            'font-weight': 'bold',
                            'align-self': 'center'
                        }
                    },
                    {
                        type: 'paragraph',
                        name: 'credit line',
                        content: 'credit line',
                        attributes: {
                            'margin-left': '10%',
                            'align-self': 'center',
                            'text-align': 'left'
                        }
                    },
                    {
                        type: 'paragraph',
                        name: 'date',
                        content: 'date',
                        attributes: {
                            'margin-right': '10%',
                            'align-self': 'center',
                            'text-align': 'right'
                        }
                    }
                ]
            },
            {
                name: 'imageBottom',
                elements: [
                    {
                        type: 'image',
                        content: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d'
                    },
                    {
                        type: 'heading',
                        name: 'title',
                        content: 'this is the Title header',
                        attributes: {
                            color: 'blue',
                            'text-align': 'center',
                            'font-weight': 'bold',
                            'align-self': 'center'
                        }
                    },
                    {
                        type: 'paragraph',
                        name: 'credit line',
                        content: 'credit line',
                        attributes: {
                            'margin-left': '5%',
                            'align-self': 'center',
                            'text-align': 'left'
                        }
                    },
                    {
                        type: 'paragraph',
                        name: 'date',
                        content: 'date',
                        attributes: {
                            'margin-right': '5%',
                            'align-self': 'center',
                            'text-align': 'right'
                        }
                    }
                ]
            },
            {
                name: 'centerTitle',
                elements: [
                    {
                        type: 'image',
                        content: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d'
                    },
                    {
                        type: 'heading',
                        name: 'title',
                        content: 'this is the Title header',
                        attributes: {
                            color: 'blue',
                            'text-align': 'center',
                            'font-weight': 'bold',
                            'align-self': 'center',
                            'justify-self': 'center'

                        }

                    },
                    {
                        type: 'paragraph',
                        name: 'credit line',
                        content: 'credit line',
                        attributes: {
                            'margin-left': '10%',
                            'align-self': 'center',
                            'text-align': 'right'
                        }
                    },
                    {
                        type: 'paragraph',
                        name: 'date',
                        content: 'date',
                        attributes: {
                            'margin-left': '10%',
                            'align-self': 'center',
                            'text-align': 'left'
                        }
                    }
                ]
            },
            {
                name: 'FullImage',
                elements: [
                    {
                        type: 'image',
                        content: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d'
                    },
                    {
                        type: 'heading',
                        name: 'title',
                        content: 'this is the Title header',
                        attributes: {
                            color: 'white',
                            'text-align': 'center',
                            'font-weight': 'bold',
                            'align-self': 'center',
                            'justify-self': 'center'

                        }

                    },
                    {
                        type: 'paragraph',
                        name: 'credit line',
                        content: 'credit line',
                        attributes: {
                            color: 'white',
                            'margin-left': '10%',
                            'align-self': 'center',
                            'text-align': 'right'
                        }
                    },
                    {
                        type: 'paragraph',
                        name: 'date',
                        content: 'date',
                        attributes: {
                            color: 'white',
                            'margin-left': '10%',
                            'align-self': 'center',
                            'text-align': 'left'
                        }
                    }
                ]
            }
        ]
    },
    {
        type: 'accentImage',
        variants: [
            {
                name: 'rightImage',
                elements: [
                    {
                        type: 'image',
                        content: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d'
                    },
                    {
                        type: 'heading',
                        name: 'title',
                        content: 'this is the Accent Image header',
                        attributes: {
                            'margin-left': '5%',
                            'text-align': 'left'
                        }
                    },
                    {
                        type: 'paragraph',
                        name: 'paragraph',
                        content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor sint eius eligendi quo itaque officia soluta odio beatae, sit, possimus enim ad, ex ea asperiores. Dignissimos excepturi tempora ipsa? Nobis.',
                        attributes: {
                            'margin-left': '5%',
                            'text-align': 'left'
                        }
                    }
                ]
            },
            {
                name: 'leftImage',
                elements: [
                    {
                        type: 'image',
                        content: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d'
                    },
                    {
                        type: 'heading',
                        name: 'title',
                        content: 'this is the Accent Image header',
                        attributes: {
                            'margin-left': '5%',
                            'text-align': 'left'
                        }
                    },
                    {
                        type: 'paragraph',
                        name: 'paragraph',
                        content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor sint eius eligendi quo itaque officia soluta odio beatae, sit, possimus enim ad, ex ea asperiores. Dignissimos excepturi tempora ipsa? Nobis.',
                        attributes: {
                            'margin-left': '5%',
                            'text-align': 'left'
                        }
                    }
                ]
            },
        ]
    }
]

export const renderHTML = (Updatedvariant: string, slideType: string, slideNumber: string) => {
    const slideVariants = SlideVariants.find(v => v.type === slideType)
    if (!slideVariants) return ''
    console.log("updatedVariant", Updatedvariant)
    const variant = slideVariants.variants.find(v => v.name === Updatedvariant)
    if (!variant) return ''
    let html: { [key: string]: string } = {};
    variant?.elements?.forEach((element: any) => {
        let styles: string[] = [];
        for (const attribute in element.attributes) {
            styles.push(`${attribute}: ${element.attributes[attribute as keyof typeof element.attributes]}`);
        }

        if (element.type === 'image') {
            html['image'] = `<img src="${element.content}" alt="${element.content}" style="${styles.join('; ')}" />`;
        }
        if (element.type === 'heading') {
            html['heading'] = `<h1 style="${styles.join('; ')}">${element.content}</h1>`;
        }
        if (element.type === 'paragraph') {
            // Allow for multiple paragraphs (e.g., credit line, date)
            if (!html['paragraph']) {
                html['paragraph'] = '';
            }
            html['paragraph'] += `\n<p style="${styles.join('; ')}">${element.content}</p>`;
        }
    });

    if (slideType === 'titleSlide') {
        return `
    <div class="slide-body" n="1">
    <title-slide variant="${Updatedvariant}" slideNumber="1">
    ${html.image}
    ${html.heading}
    ${html.paragraph}
    </title-slide>
    </div>
    `
    }
    else if (slideType === 'accentImage') {
        return `
    <div class="slide-body" n="${slideNumber}">
    <accentimage-layout variant="${Updatedvariant}" slideNumber="${slideNumber}">
    ${html.image}
    <accentimage-content>
    ${html.heading}
    ${html.paragraph}
    </accentimage-content>
    </accentimage-layout>
    </div>
    `
    }
}

// data: <div class="slide-body" n="2">
// <accentimage-layout variant="rightImage">
// <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d" alt="Mountain Landscape" />
// <accentimage-content>
// <h1 style="margin-left: 5%; text-align: left;">this is the Accent Image header</h1>
// <p style="margin-left: 5%; text-align: left;">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor sint eius eligendi quo itaque officia soluta odio beatae, sit, possimus enim ad, ex ea asperiores. Dignissimos excepturi tempora ipsa? Nobis.
// </p>
// </accentimage-content>
// </accentimage-layout>
// data: </div>