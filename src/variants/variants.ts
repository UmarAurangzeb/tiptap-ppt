type VariantElement = {
    type: 'image' | 'heading' | 'paragraph' | 'shape' | 'block-container'
    content: string
    name?: string
    class?: string
    attributes?: {
        color?: string
        'text-align'?: string
        'font-weight'?: string
        'align-self'?: string
        'justify-self'?: string
        'margin-left'?: string
        'margin-right'?: string
        'background-color'?: string
        'width'?: string
        'height'?: string
    }
    children?: VariantElement[]
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
                        class: '',
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
                        class: '',

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
                        class: '',

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
                        class: '',
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
                        class: '',
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
                        class: '',
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
                        class: '',
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
                        class: '',
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
                        class: '',
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
                        class: '',
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
                        class: '',
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
                        class: '',
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
                        class: '',
                        attributes: {
                            'margin-left': '5%',
                            'text-align': 'left'
                        }
                    },
                    {
                        type: 'paragraph',
                        name: 'paragraph',
                        content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor sint eius eligendi quo itaque officia soluta odio beatae, sit, possimus enim ad, ex ea asperiores. Dignissimos excepturi tempora ipsa? Nobis.',
                        class: '',
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
                        class: '',
                        attributes: {
                            'margin-left': '5%',
                            'text-align': 'left'
                        }
                    },
                    {
                        type: 'paragraph',
                        name: 'paragraph',
                        content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor sint eius eligendi quo itaque officia soluta odio beatae, sit, possimus enim ad, ex ea asperiores. Dignissimos excepturi tempora ipsa? Nobis.',
                        class: '',
                        attributes: {
                            'margin-left': '5%',
                            'text-align': 'left',
                            'color': 'blue'
                        }
                    }
                ]
            },
        ]
    },
    {
        type: 'headerText',
        variants: [
            {
                name: 'leftHeader',
                elements: [
                    {
                        type: 'block-container',
                        name: 'block-container',
                        content: '',
                        class: '',
                        attributes: {
                            'background-color': '#D9D9D9',
                            'width': '100%',
                            'height': '100%'
                        },
                        children: [
                            {
                                type: 'heading',
                                name: 'title',
                                content: 'this is the header',
                                attributes: {
                                    'text-align': 'left'
                                }
                            }
                        ]
                    },
                    {
                        type: 'paragraph',
                        name: 'paragraph',
                        content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor sint eius eligendi quo itaque officia soluta odio beatae, sit, possimus enim ad, ex ea asperiores. Dignissimos excepturi tempora ipsa? Nobis.',
                        class: '',
                        attributes: {
                            'text-align': 'left',
                            'margin-left': '5%'
                        }
                    }
                ]

            },
            {
                name: 'centerHeader',
                elements: [
                    {
                        type: 'block-container',
                        name: 'block-container',
                        content: '',

                        attributes: {
                            'width': '100%',
                            'height': '100%'
                        },
                        children: [
                            {
                                type: 'heading',
                                name: 'title',
                                content: 'this is the header',
                                class: '',
                                attributes: {
                                    'text-align': 'center'
                                }
                            }
                        ]
                    },
                    {
                        type: 'paragraph',
                        name: 'paragraph',
                        content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor sint eius eligendi quo itaque officia soluta odio beatae, sit, possimus enim ad, ex ea asperiores. Dignissimos excepturi tempora ipsa? Nobis.',
                        class: '',
                        attributes: {
                            'text-align': 'center'
                        }
                    }
                ]
            }
        ]
    },
    {
        type: 'textCardLayout',
        variants: [
            {
                name: 'vertical',
                elements: [
                    {
                        type: 'heading',
                        name: 'title',
                        content: 'this is the header',
                        class: '',
                        attributes: {
                            'text-align': 'left',
                            'font-weight': 'bold'
                        }
                    },
                    {
                        type: 'block-container',
                        name: 'text-card-parent',
                        content: '',
                        class: 'text-card-parent',
                        children: [
                            {
                                type: 'block-container',
                                name: 'text-card-content',
                                content: '',
                                class: 'text-card-content',
                                attributes: {
                                    'margin-top': '1%',
                                    'background-color': '#D9D9D9',
                                    'width': '100%',
                                    'height': '100%',
                                    'border-radius': '20px'
                                },
                                children: [
                                    {
                                        type: 'heading',
                                        name: 'card-header',
                                        content: 'text card header',
                                        attributes: {
                                            'text-align': 'center'
                                        }
                                    },
                                    {
                                        type: 'paragraph',
                                        name: 'card-content',
                                        content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor sint eius eligendi quo itaque .Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor sint eius eligendi quo itaque .',
                                        attributes: {
                                            'text-align': 'left'
                                        }
                                    }
                                ]
                            },
                            {
                                type: 'block-container',
                                name: 'text-card-content',
                                content: '',
                                class: 'text-card-content',
                                attributes: {
                                    'margin-top': '1%',
                                    'background-color': '#D9D9D9',
                                    'width': '100%',
                                    'height': '100%',
                                    'border-radius': '20px'
                                },
                                children: [
                                    {
                                        type: 'heading',
                                        name: 'card-header',
                                        content: 'text card header',
                                        attributes: {
                                            'text-align': 'center'
                                        }
                                    },
                                    {
                                        type: 'paragraph',
                                        name: 'card-content',
                                        content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor sint eius eligendi quo itaque . loeremasd sdks asdfn s skdan skfekfms skm',
                                        attributes: {
                                            'text-align': 'left'
                                        }
                                    }
                                ]
                            },
                            {
                                type: 'block-container',
                                name: 'text-card-content',
                                content: '',
                                class: 'text-card-content',
                                attributes: {
                                    'margin-top': '1%',
                                    'background-color': '#D9D9D9',
                                    'width': '100%',
                                    'height': '100%',
                                    'border-radius': '20px'
                                },
                                children: [
                                    {
                                        type: 'heading',
                                        name: 'card-header',
                                        content: 'text card header',
                                        attributes: {
                                            'text-align': 'center'
                                        }
                                    },
                                    {
                                        type: 'paragraph',
                                        name: 'card-content',
                                        content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor sint eius eligendi quo itaque .',
                                        attributes: {
                                            'text-align': 'left'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: 'horizontal',
                elements: [
                    {
                        type: 'heading',
                        name: 'title',
                        content: 'this is the header',
                        class: '',
                        attributes: {
                            'text-align': 'left',
                            'font-weight': 'bold'
                        }
                    },
                    {
                        type: 'block-container',
                        name: 'text-card-parent',
                        content: '',
                        class: 'text-card-parent',
                        attributes: {
                            'width': '100%',
                            'height': '100%'
                        },
                        children: [
                            {
                                type: 'block-container',
                                name: 'text-card-content',
                                content: '',
                                class: 'text-card-content',
                                attributes: {
                                    'background-color': '#D9D9D9',
                                    'width': '100%',
                                    'height': '100%',
                                    'border-radius': '20px'
                                },
                                children: [
                                    {
                                        type: 'heading',
                                        name: 'card-header',
                                        content: 'text card header',
                                        attributes: {
                                            'text-align': 'left',
                                            'margin-left': '2%'

                                        }
                                    },
                                    {
                                        type: 'paragraph',
                                        name: 'card-content',
                                        content: 'Lorem, ipsum dolor sit amet consectetur adip',
                                        attributes: {
                                            'text-align': 'left',
                                        }
                                    }
                                ]
                            },
                            {
                                type: 'block-container',
                                name: 'text-card-content',
                                content: '',
                                class: 'text-card-content',
                                attributes: {
                                    'margin-right': '1%',
                                    'background-color': '#D9D9D9',
                                    'width': '100%',
                                    'height': '100%',
                                    'border-radius': '20px'
                                },
                                children: [
                                    {
                                        type: 'heading',
                                        name: 'card-header',
                                        content: 'text card header',
                                        attributes: {
                                            'text-align': 'left',
                                            'margin-left': '2%'
                                        }
                                    },
                                    {
                                        type: 'paragraph',
                                        name: 'card-content',
                                        content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit',
                                        attributes: {
                                            'text-align': 'left',
                                        }
                                    }
                                ]
                            },
                            {
                                type: 'block-container',
                                name: 'text-card-content',
                                content: '',
                                class: 'text-card-content',
                                attributes: {
                                    'margin-right': '1%',
                                    'background-color': '#D9D9D9',
                                    'width': '100%',
                                    'height': '100%',
                                    'border-radius': '20px'
                                },
                                children: [
                                    {
                                        type: 'heading',
                                        name: 'card-header',
                                        content: 'text card header',
                                        attributes: {
                                            'text-align': 'left',
                                            'margin-left': '2%'
                                        }
                                    },
                                    {
                                        type: 'paragraph',
                                        name: 'card-content',
                                        content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor',
                                        attributes: {
                                            'text-align': 'left',
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: 'columns',
                elements: [
                    {
                        type: 'heading',
                        name: 'title',
                        content: 'this is the header',
                        class: '',
                        attributes: {
                            'text-align': 'left',
                            'font-weight': 'bold'
                        }
                    },
                    {
                        type: 'block-container',
                        name: 'text-card-parent',
                        content: '',
                        class: 'text-card-parent',
                        attributes: {
                            'width': '100%',
                            'height': '100%'
                        },
                        children: [
                            {
                                type: 'block-container',
                                name: 'text-card-content',
                                content: '',
                                class: 'text-card-content',
                                attributes: {
                                    'margin-right': '1%',
                                    'width': '100%',
                                    'height': '100%'
                                },
                                children: [
                                    {
                                        type: 'heading',
                                        name: 'card-header',
                                        content: 'text card header',
                                        attributes: {
                                            'text-align': 'left'
                                        }
                                    },
                                    {
                                        type: 'paragraph',
                                        name: 'card-content',
                                        content: 'Lorem, ipsum dolor sit  ipsum dolor sit amet consectetur adipisicing  ipsum dolor sit amet consectetur adipisicing  ipsum dolor sit amet consectetur adipisicing',
                                        attributes: {
                                            'text-align': 'left'
                                        }
                                    }
                                ]
                            },
                            {
                                type: 'block-container',
                                name: 'text-card-content',
                                content: '',
                                class: 'text-card-content',
                                attributes: {
                                    'margin-right': '1%',
                                    'width': '100%',
                                    'height': '100%'
                                },
                                children: [
                                    {
                                        type: 'heading',
                                        name: 'card-header',
                                        content: 'text card header',
                                        attributes: {
                                            'text-align': 'left'
                                        }
                                    },
                                    {
                                        type: 'paragraph',
                                        name: 'card-content',
                                        content: 'Lorem, ipsum dolor sit  ipsum dolor sit amet consectetur adipisicing  ipsum dolor sit amet consectetur adipisicing  ipsum dolor sit amet consectetur adipisicing',
                                        attributes: {
                                            'text-align': 'left'
                                        }
                                    }
                                ]
                            },
                            {
                                type: 'block-container',
                                name: 'text-card-content',
                                content: '',
                                class: 'text-card-content',
                                attributes: {
                                    'margin-right': '1%',
                                    'width': '100%',
                                    'height': '100%'
                                },
                                children: [
                                    {
                                        type: 'heading',
                                        name: 'card-header',
                                        content: 'text card header',
                                        attributes: {
                                            'text-align': 'left'
                                        }
                                    },
                                    {
                                        type: 'paragraph',
                                        name: 'card-content',
                                        content: 'Lorem, ipsum dolor sit  ipsum dolor sit amet consectetur adipisicing  ipsum dolor sit amet consectetur adipisicing  ipsum dolor sit amet consectetur adipisicing\n. ',
                                        attributes: {
                                            'text-align': 'left'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        type: 'imageFormat',
        variants: [
            {
                name: 'imageFormat-squared',
                elements: [
                    {
                        type: 'image',
                        content: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d'
                    },
                    {
                        type: 'image',
                        content: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d'
                    },
                    {
                        type: 'image',
                        content: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d'
                    },
                    {
                        type: 'block-container',
                        name: 'content-block',
                        content: '',
                        attributes: {
                            'width': '100%',
                            'height': '100%'
                        },
                        children: [
                            {
                                type: 'heading',
                                name: 'title',
                                content: 'this is the header',
                                attributes: {
                                    'text-align': 'left'
                                }
                            },
                            {
                                type: 'paragraph',
                                name: 'content',
                                content: 'icia soluta odio beatae, sit, possimus enim ad, ex ea asperiores. Dignissimos excepturi tempora ipsa? Nobis.',
                                attributes: {
                                    'text-align': 'left'
                                }
                            }
                        ]
                    },
                    {
                        type: 'block-container',
                        name: 'content-block',
                        content: '',
                        attributes: {
                            'width': '100%',
                            'height': '100%'
                        },
                        children: [
                            {
                                type: 'heading',
                                name: 'title',
                                content: 'this is the header',
                                attributes: {
                                    'text-align': 'left'
                                }
                            },
                            {
                                type: 'paragraph',
                                name: 'content',
                                content: 'ue officia soluta odio beatae, sit, possimus enim ad, ex ea asperiores. Dignissimos excepturi tempora ipsa? Nobis.',
                                attributes: {
                                    'text-align': 'left'
                                }
                            }
                        ]
                    },
                    {
                        type: 'block-container',
                        name: 'content-block',
                        content: '',
                        attributes: {
                            'width': '100%',
                            'height': '100%'
                        },
                        children: [
                            {
                                type: 'heading',
                                name: 'title',
                                content: 'this is the header',
                                attributes: {
                                    'text-align': 'left'
                                }
                            },
                            {
                                type: 'paragraph',
                                name: 'content',
                                content: 'icia soluta odio beatae, sit, possimus enim ad, ex ea asperiores. Dignissimos excepturi tempora ipsa? Nobis.',
                                attributes: {
                                    'text-align': 'left'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                name: 'imageFormat-rounded',
                elements: [
                    {
                        type: 'image',
                        content: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
                        attributes: {
                            'border-radius': '200px'
                        }
                    },
                    {
                        type: 'image',
                        content: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
                        attributes: {
                            'border-radius': '200px'
                        }
                    },
                    {
                        type: 'image',
                        content: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
                        attributes: {
                            'border-radius': '200px'
                        }
                    },
                    {
                        type: 'block-container',
                        name: 'content-block',
                        content: '',
                        attributes: {
                            'width': '100%',
                            'height': '100%'
                        },
                        children: [
                            {
                                type: 'heading',
                                name: 'title',
                                content: 'this is the header',
                                attributes: {
                                    'text-align': 'left'
                                }
                            },
                            {
                                type: 'paragraph',
                                name: 'content',
                                content: 'icia soluta odio beatae, sit, possimus enim ad, ex ea asperiores. Dignissimos excepturi tempora ipsa? Nobis.',
                                attributes: {
                                    'text-align': 'left'
                                }
                            }
                        ]
                    },
                    {
                        type: 'block-container',
                        name: 'content-block',
                        content: '',
                        attributes: {
                            'width': '100%',
                            'height': '100%'
                        },
                        children: [
                            {
                                type: 'heading',
                                name: 'title',
                                content: 'this is the header',
                                attributes: {
                                    'text-align': 'left'
                                }
                            },
                            {
                                type: 'paragraph',
                                name: 'content',
                                content: 'ue officia soluta odio beatae, sit, possimus enim ad, ex ea asperiores. Dignissimos excepturi tempora ipsa? Nobis.',
                                attributes: {
                                    'text-align': 'left'
                                }
                            }
                        ]
                    },
                    {
                        type: 'block-container',
                        name: 'content-block',
                        content: '',
                        attributes: {
                            'width': '100%',
                            'height': '100%'
                        },
                        children: [
                            {
                                type: 'heading',
                                name: 'title',
                                content: 'this is the header',
                                attributes: {
                                    'text-align': 'left'
                                }
                            },
                            {
                                type: 'paragraph',
                                name: 'content',
                                content: 'icia soluta odio beatae, sit, possimus enim ad, ex ea asperiores. Dignissimos excepturi tempora ipsa? Nobis.',
                                attributes: {
                                    'text-align': 'left'
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
]

export const renderHTML = (Updatedvariant: string, slideType: string, slideNumber: string) => {
    const variant = SlideVariants.find(v => v.type === slideType)?.variants.find(v => v.name === Updatedvariant);
    if (!variant) return '';

    const renderElement = (element: VariantElement): string => {
        const attributes = element.attributes || {};
        const styleString = Object.entries(attributes)
            .map(([key, value]) => `${key}: ${value}`)
            .join('; ');

        const classAttr = element.class ? ` class="${element.class}"` : '';

        switch (element.type) {
            case 'image':
                return `<img src="${element.content}" style="${styleString}" alt="Mountain Landscape" />`;
            case 'heading':
                return `<h1 style="${styleString}">${element.content}</h1>`;
            case 'paragraph':
                return `<p style="${styleString}">${element.content}</p>`;
            case 'block-container':
                const childrenHTML = element.children?.map(child => renderElement(child)).join('\n') || '';
                return `<block-container${classAttr} style="${styleString}">${childrenHTML}</block-container>`;
            default:
                return '';
        }
    };

    const elementsHTML = variant.elements.map(element => renderElement(element as VariantElement)).join('\n');

    switch (slideType) {
        case 'titleSlide':
            return `<div class="slide-body" n="${slideNumber}"><title-slide variant="${Updatedvariant}" slideNumber="${slideNumber}">${elementsHTML}</title-slide></div>`;
        case 'accentImage':
            return `<div class="slide-body" n="${slideNumber}"><accentimage-layout variant="${Updatedvariant}" slideNumber="${slideNumber}">${elementsHTML}<accentimage-content></accentimage-content></accentimage-layout></div>`;
        case 'headerText':
            console.log("elementsHTML", elementsHTML)
            return `<div class="slide-body" n="${slideNumber}"><headertext-layout variant="${Updatedvariant}" slideNumber="${slideNumber}">${elementsHTML}</headertext-layout></div>`;
        case 'textCardLayout':
            console.log("elementsHTML", elementsHTML)
            return `<div class="slide-body" n="${slideNumber}"><text-card-layout variant="${Updatedvariant}" slideNumber="${slideNumber}">${elementsHTML}</text-card-layout></div>`;
        case 'imageFormat':
            return `<div class="slide-body" n="${slideNumber}"><image-format variant="${Updatedvariant}" slideNumber="${slideNumber}">${elementsHTML}</image-format></div>`;
        default:
            return '';
    }
};