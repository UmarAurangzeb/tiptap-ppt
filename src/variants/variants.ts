type VariantElement = {
    type: 'image' | 'heading' | 'paragraph' | 'shape' | 'block-container' | 'li' | 'svg-node' | 'icon'
    content: string
    name?: string
    class?: string
    bulletColor?: string
    bulletText?: string
    src?: string
    setDisplayNone?: boolean
    attributes?: {
        color?: string
        'text-align'?: string
        'font-weight'?: string
        'align-self'?: string
        'justify-self'?: string
        'margin-left'?: string
        'margin-right'?: string
        'margin-top'?: string
        'background-color'?: string
        'width'?: string
        'height'?: string
        'border-radius'?: string
        'flex-direction'?: string
        'display'?: string
        'justify-content'?: string
        'align-items'?: string
        iconName?: string
        iconSize?: string
        iconColor?: string
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
                            'align-self': 'center',
                            'text-align': 'right'
                        }
                    }
                ]
            },
            {
                name: 'centerTitle',
                elements: [
                    // {
                    //     type: 'image',
                    //     content: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
                    //     setDisplayNone: true,
                    //     attributes: {
                    //     }
                    // },
                    {
                        type: 'heading',
                        name: 'title',
                        content: 'this is the Title header',
                        class: '',
                        attributes: {
                            'color': 'pink',
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
                            'text-align': 'left'
                        }
                    },
                    {
                        type: 'paragraph',
                        name: 'paragraph',
                        content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor sint eius eligendi quo itaque officia soluta odio beatae, sit, possimus enim ad, ex ea asperiores. Dignissimos excepturi tempora ipsa? Nobis.',
                        class: '',
                        attributes: {
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
                            'text-align': 'left'
                        }
                    },
                    {
                        type: 'paragraph',
                        name: 'paragraph',
                        content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor sint eius eligendi quo itaque officia soluta odio beatae, sit, possimus enim ad, ex ea asperiores. Dignissimos excepturi tempora ipsa? Nobis.',
                        class: '',
                        attributes: {
                            'text-align': 'left',
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
                            'text-align': 'left'
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
                                        content: 'Lorem, ipsum dolorsectetur adipisicing  ipsum dolor sit amet consectetur adipisicing',
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
                                        content: 'Lorem, ipsum dolor sit  ipsum dolor sit amet ctetur adipisicing  ipsum dolor sit amet consectetur adipisicing',
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
    {
        type: 'bulletList',
        variants: [
            {
                name: 'rightImage',
                elements: [
                    {
                        type: 'image',
                        content: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',

                    },
                    {
                        type: 'heading',
                        name: 'title',
                        content: 'this is the header',
                        attributes: {
                            'text-align': 'left',
                        },
                    },
                    {
                        type: 'block-container',
                        name: 'unordered-list',
                        content: '',
                        class: 'unordered-list',
                        children: [
                            {
                                type: 'li',
                                name: 'item1',
                                content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos at recusandae assumenda libero asperiores rerum minus magnam totam iusto quis!',
                                bulletColor: '#D9D9D9',

                                attributes: {
                                    // bulletColor: '#D9D9D9',
                                },
                                children: [
                                    {
                                        type: 'paragraph',
                                        name: 'p1',
                                        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos at recusandae assumenda libero asperiores rerum minus magnam totam iusto quis!',
                                    }
                                ]
                            },
                            {
                                type: 'li',
                                name: 'item2',
                                content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos at recusandae assumenda libem iusto quis!',
                                bulletColor: '#D9D9D9',

                                attributes: {
                                    // bulletColor: '#D9D9D9',
                                },
                                children: [
                                    {
                                        type: 'paragraph',
                                        name: 'p2',
                                        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos at recusandae assumenda libem iusto quis!',
                                    }
                                ]
                            },
                            {
                                type: 'li',
                                name: 'item3',
                                content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos at r libero asperiores rerum minus magnam totam iusto quis!',
                                bulletColor: '#D9D9D9',
                                attributes: {
                                },
                                children: [
                                    {
                                        type: 'paragraph',
                                        name: 'p3',
                                        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos at r libero asperiores rerum minus magnam totam iusto quis!',
                                    }
                                ]
                            },
                        ],
                    },
                ],
            },
            {
                name: 'noImage',
                elements: [
                    // {
                    //     type: 'image',
                    //     content: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
                    //     attributes: {
                    //         display: 'none'
                    //     },
                    // },
                    {
                        type: 'heading',
                        name: 'title',
                        content: 'this is the header',
                        attributes: {
                            'text-align': 'left',
                        },
                    },
                    {
                        type: 'image',
                        content: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
                        setDisplayNone: true,
                    },
                    {
                        type: 'block-container',
                        name: 'unordered-list',
                        content: '',
                        class: 'unordered-list',
                        children: [
                            {
                                type: 'li',
                                name: 'item1',
                                content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos at recusandae assumenda libero asperiores rerum minus magnam totam iusto quis!',
                                bulletColor: '#D9D9D9',
                                attributes: {
                                },
                                children: [
                                    {
                                        type: 'paragraph',
                                        name: 'p1',
                                        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos at recusandae assumenda libero asperiores rerum minus magnam totam iusto quis!',
                                    }
                                ]
                            },
                            {
                                type: 'li',
                                name: 'item2',
                                content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos at recusandae assumenda libem iusto quis!',
                                bulletColor: '#D9D9D9',

                                attributes: {
                                },
                                children: [
                                    {
                                        type: 'paragraph',
                                        name: 'p2',
                                        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos at recusandae assumenda libem iusto quis!',
                                    }
                                ]
                            },
                            {
                                type: 'li',
                                name: 'item3',
                                content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos at r libero asperiores rerum minus magnam totam iusto quis!',
                                bulletColor: '#D9D9D9',
                                attributes: {
                                    bulletColor: '#D9D9D9',
                                },
                                children: [
                                    {
                                        type: 'paragraph',
                                        name: 'p3',
                                        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos at r libero asperiores rerum minus magnam totam iusto quis!',
                                    }
                                ]
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        type: 'infoCollection',
        variants: [
            {
                name: 'horizontal',
                elements: [
                    {
                        type: 'heading',
                        name: 'title',
                        content: 'this is the header',
                        attributes: {
                            'text-align': 'center'
                        }
                    },
                    {
                        type: 'svg-node',
                        name: 'arrow',
                        content: '',
                        src: '/Arrow4.svg',
                        attributes: {
                            'width': '100%',
                            'height': '100%',
                            'color': 'purple'
                        }
                    },
                    {
                        type: 'block-container',
                        name: 'info-collection-item',
                        content: '',
                        class: 'info-collection-item',
                        attributes: {
                            'margin-top': '2%'
                        },
                        children: [
                            {
                                type: 'li',
                                name: 'item1',
                                content: '',
                                bulletColor: '#D9D9D9',
                                bulletText: '1',
                                attributes: {
                                    'flex-direction': 'column'
                                },
                                children: [
                                    {
                                        type: 'block-container',
                                        name: 'content-block',
                                        content: '',
                                        attributes: {
                                            'margin-top': '-1%',
                                            'margin-left': '2%'
                                        },
                                        children: [
                                            {
                                                type: 'heading',
                                                name: 'item-title',
                                                content: 'this is the header'
                                            },
                                            {
                                                type: 'paragraph',
                                                name: 'item-content',
                                                content: 'Lorem ipsum dolorlit. Dignissimos at recusandae assumenda libero asperiores rerum minus magnam totam iusto quis!',
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
                        type: 'block-container',
                        name: 'info-collection-item',
                        content: '',
                        class: 'info-collection-item',
                        attributes: {
                            'margin-top': '2%'
                        },
                        children: [
                            {
                                type: 'li',
                                name: 'item2',
                                content: '',
                                bulletColor: '#D9D9D9',
                                bulletText: '2',
                                attributes: {
                                    'flex-direction': 'column'
                                },
                                children: [
                                    {
                                        type: 'block-container',
                                        name: 'content-block',
                                        content: '',
                                        attributes: {
                                            'margin-top': '-1%',
                                            'margin-left': '2%'
                                        },
                                        children: [
                                            {
                                                type: 'heading',
                                                name: 'item-title',
                                                content: 'this is the header'
                                            },
                                            {
                                                type: 'paragraph',
                                                name: 'item-content',
                                                content: 'Lorem ipsum dolor elit. Dignissimos at recusandae assibero asperiores rerum minus magnam totam iusto quis!',
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
                        type: 'block-container',
                        name: 'info-collection-item',
                        content: '',
                        class: 'info-collection-item',
                        attributes: {
                            'margin-top': '2%'
                        },
                        children: [
                            {
                                type: 'li',
                                name: 'item3',
                                content: '',
                                bulletColor: '#D9D9D9',
                                bulletText: '3',
                                attributes: {
                                    'flex-direction': 'column'
                                },
                                children: [
                                    {
                                        type: 'block-container',
                                        name: 'content-block',
                                        content: '',
                                        attributes: {
                                            'margin-top': '-1%',
                                            'margin-left': '2%'
                                        },
                                        children: [
                                            {
                                                type: 'heading',
                                                name: 'item-title',
                                                content: 'this is the header'
                                            },
                                            {
                                                type: 'paragraph',
                                                name: 'item-content',
                                                content: 'Lorem ipsum dolor sit amet conseriores rerum minus magnam totam iusto quis!',
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
                        type: 'block-container',
                        name: 'info-collection-item-4',
                        content: '',
                        class: 'info-collection-item-4',
                        attributes: {
                            'margin-top': '4%',
                            'display': 'none'
                        },
                        children: [
                            {
                                type: 'li',
                                name: 'item4',
                                content: '',
                                bulletColor: '#D9D9D9',
                                bulletText: '4',
                                children: [
                                    {
                                        type: 'block-container',
                                        name: 'content-block',
                                        content: '',
                                        attributes: {
                                            'margin-top': '-1%'
                                        },
                                        children: [
                                            {
                                                type: 'heading',
                                                name: 'item-title',
                                                content: 'this is the header'
                                            },
                                            {
                                                type: 'paragraph',
                                                name: 'item-content',
                                                content: 'Lorem ipsum dolor sit amet issimoes rerum minus magnam totam iusto quis!',
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
                name: 'largeBulletList',
                elements: [
                    {
                        type: 'heading',
                        name: 'title',
                        content: 'this is the header',
                        attributes: {
                            'text-align': 'left'
                        }
                    },
                    {
                        type: 'block-container',
                        name: 'info-collection-item-1',
                        content: '',
                        class: 'info-collection-item-1',
                        children: [
                            {
                                type: 'li',
                                name: 'item1',
                                content: '',
                                bulletColor: '#D9D9D9',
                                bulletText: '1',
                                children: [
                                    {
                                        type: 'block-container',
                                        name: 'content-block',
                                        content: '',
                                        attributes: {
                                            'margin-top': '-3%'
                                        },
                                        children: [
                                            {
                                                type: 'heading',
                                                name: 'item-title',
                                                content: 'this is the header'
                                            },
                                            {
                                                type: 'paragraph',
                                                name: 'item-content',
                                                content: 'Lorem ipsum dolorlit. Dignissimos at recusandae assumenda libero asperiores rerum minus magnam totam iusto quis!',
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
                        type: 'block-container',
                        name: 'info-collection-item-2',
                        content: '',
                        class: 'info-collection-item-2',
                        children: [
                            {
                                type: 'li',
                                name: 'item2',
                                content: '',
                                bulletColor: '#D9D9D9',
                                bulletText: '2',
                                children: [
                                    {
                                        type: 'block-container',
                                        name: 'content-block',
                                        content: '',
                                        attributes: {
                                            'margin-top': '-3%'
                                        },
                                        children: [
                                            {
                                                type: 'heading',
                                                name: 'item-title',
                                                content: 'this is the header'
                                            },
                                            {
                                                type: 'paragraph',
                                                name: 'item-content',
                                                content: 'Lorem ipsum dolor elit. Dignissimos at recusandae assibero asperiores rerum minus magnam totam iusto quis!',
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
                        type: 'block-container',
                        name: 'info-collection-item-3',
                        content: '',
                        class: 'info-collection-item-3',
                        attributes: {
                            'margin-top': '4%'
                        },
                        children: [
                            {
                                type: 'li',
                                name: 'item3',
                                content: '',
                                bulletColor: '#D9D9D9',
                                bulletText: '3',
                                children: [
                                    {
                                        type: 'block-container',
                                        name: 'content-block',
                                        content: '',
                                        attributes: {
                                            'margin-top': '-3%'
                                        },
                                        children: [
                                            {
                                                type: 'heading',
                                                name: 'item-title',
                                                content: 'this is the header'
                                            },
                                            {
                                                type: 'paragraph',
                                                name: 'item-content',
                                                content: 'Lorem ipsum dolor sit amet conseriores rerum minus magnam totam iusto quis!',
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
                        type: 'block-container',
                        name: 'info-collection-item-4',
                        content: '',
                        class: 'info-collection-item-4',
                        attributes: {
                            'margin-top': '4%'
                        },
                        children: [
                            {
                                type: 'li',
                                name: 'item4',
                                content: '',
                                bulletColor: '#D9D9D9',
                                bulletText: '4',
                                children: [
                                    {
                                        type: 'block-container',
                                        name: 'content-block',
                                        content: '',
                                        attributes: {
                                            'margin-top': '-3%'
                                        },
                                        children: [
                                            {
                                                type: 'heading',
                                                name: 'item-title',
                                                content: 'this is the header'
                                            },
                                            {
                                                type: 'paragraph',
                                                name: 'item-content',
                                                content: 'Lorem ipsum dolor sit amet issimoes rerum minus magnam totam iusto quis!',
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
                name: 'vertical',
                elements: [
                    {
                        type: 'heading',
                        name: 'title',
                        content: 'this is the header',
                        attributes: {
                            'text-align': 'left'
                        }
                    },
                    {
                        type: 'shape',
                        name: 'background-shape',
                        content: '',
                        attributes: {
                            'width': '100%',
                            'height': '100%',
                            'background-color': '#D9D9D9'
                        }
                    },
                    {
                        type: 'block-container',
                        name: 'info-collection-item-1',
                        content: '',
                        class: 'info-collection-item-1',
                        attributes: {
                            'margin-top': '2%'
                        },
                        children: [
                            {
                                type: 'li',
                                name: 'item1',
                                content: '',
                                bulletColor: '#D9D9D9',
                                bulletText: '1',
                                children: [
                                    {
                                        type: 'block-container',
                                        name: 'content-block',
                                        content: '',
                                        attributes: {
                                            'margin-top': '-1%'
                                        },
                                        children: [
                                            {
                                                type: 'heading',
                                                name: 'item-title',
                                                content: 'this is the header'
                                            },
                                            {
                                                type: 'paragraph',
                                                name: 'item-content',
                                                content: 'Lorem ipsum dolorlit. Dignissimos at recusandae assumenda libero asperiores rerum minus magnam totam iusto quis!',
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
                        type: 'block-container',
                        name: 'info-collection-item-2',
                        content: '',
                        class: 'info-collection-item-2',
                        attributes: {
                            'margin-top': '2%'
                        },
                        children: [
                            {
                                type: 'li',
                                name: 'item2',
                                content: '',
                                bulletColor: '#D9D9D9',
                                bulletText: '2',
                                children: [
                                    {
                                        type: 'block-container',
                                        name: 'content-block',
                                        content: '',
                                        attributes: {
                                            'margin-top': '-1%'
                                        },
                                        children: [
                                            {
                                                type: 'heading',
                                                name: 'item-title',
                                                content: 'this is the header'
                                            },
                                            {
                                                type: 'paragraph',
                                                name: 'item-content',
                                                content: 'Lorem ipsum dolor elit. Dignissimos at recusandae assibero asperiores rerum minus magnam totam iusto quis!',
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
                        type: 'block-container',
                        name: 'info-collection-item-3',
                        content: '',
                        class: 'info-collection-item-3',
                        attributes: {
                            'margin-top': '2%'
                        },
                        children: [
                            {
                                type: 'li',
                                name: 'item3',
                                content: '',
                                bulletColor: '#D9D9D9',
                                bulletText: '3',
                                children: [
                                    {
                                        type: 'block-container',
                                        name: 'content-block',
                                        content: '',
                                        attributes: {
                                            'margin-top': '-1%'
                                        },
                                        children: [
                                            {
                                                type: 'heading',
                                                name: 'item-title',
                                                content: 'this is the header'
                                            },
                                            {
                                                type: 'paragraph',
                                                name: 'item-content',
                                                content: 'Lorem ipsum dolor sit amet conseriores rerum minus magnam totam iusto quis!',
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
                        type: 'block-container',
                        name: 'info-collection-item-4',
                        content: '',
                        class: 'info-collection-item-4',
                        attributes: {
                            'margin-top': '4%',
                            'display': 'none'
                        },
                        children: [
                            {
                                type: 'li',
                                name: 'item4',
                                content: '',
                                bulletColor: '#D9D9D9',
                                bulletText: '4',
                                children: [
                                    {
                                        type: 'block-container',
                                        name: 'content-block',
                                        content: '',
                                        attributes: {
                                            'margin-top': '-1%'
                                        },
                                        children: [
                                            {
                                                type: 'heading',
                                                name: 'item-title',
                                                content: 'this is the header'
                                            },
                                            {
                                                type: 'paragraph',
                                                name: 'item-content',
                                                content: 'Lorem ipsum dolor sit amet issimoes rerum minus magnam totam iusto quis!',
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
                name: 'icon-text',
                elements: [
                    {
                        type: 'heading',
                        name: 'title',
                        content: 'this is the header',
                        attributes: {
                            'text-align': 'center'
                        }
                    },
                    {
                        type: 'block-container',
                        name: 'icon-container-1',
                        content: '',
                        attributes: {
                            'width': '50%',
                            'height': '80%',
                            'background-color': '#D9D9D9',
                            'border-radius': '50%'
                        },
                        children: [
                            {
                                type: 'icon',
                                name: 'icon-1',
                                content: '',
                                attributes: {
                                    'iconName': 'fa-solid fa-star',
                                    'iconColor': 'purple'
                                }
                            }
                        ]
                    },
                    {
                        type: 'block-container',
                        name: 'icon-container-2',
                        content: '',
                        attributes: {
                            'width': '50%',
                            'height': '80%',
                            'background-color': '#D9D9D9',
                            'border-radius': '50%'
                        },
                        children: [
                            {
                                type: 'icon',
                                name: 'icon-2',
                                content: '',
                                attributes: {
                                    'iconName': 'fa-solid fa-star',
                                    'iconColor': 'purple'
                                }
                            }
                        ]
                    },
                    {
                        type: 'block-container',
                        name: 'icon-container-3',
                        content: '',
                        attributes: {
                            'width': '50%',
                            'height': '80%',
                            'background-color': '#D9D9D9',
                            'border-radius': '50%'
                        },
                        children: [
                            {
                                type: 'icon',
                                name: 'icon-3',
                                content: '',
                                attributes: {
                                    'iconName': 'fa-solid fa-star',
                                    'iconColor': 'purple'
                                }
                            }
                        ]
                    },
                    {
                        type: 'block-container',
                        name: 'content-block-1',
                        content: '',
                        attributes: {
                            'width': '100%',
                            'height': '100%'
                        },
                        children: [
                            {
                                type: 'heading',
                                name: 'block-title-1',
                                content: 'this is the header',
                                attributes: {
                                    'text-align': 'center'
                                }
                            },
                            {
                                type: 'paragraph',
                                name: 'block-content-1',
                                content: 'icia soluta odio beatae, sit, possimus enim ad, ex ea asperiores. Dignissimos excepturi tempora ipsa? Nobis.',
                                attributes: {
                                    'text-align': 'center'
                                }
                            }
                        ]
                    },
                    {
                        type: 'block-container',
                        name: 'content-block-2',
                        content: '',
                        attributes: {
                            'width': '100%',
                            'height': '100%'
                        },
                        children: [
                            {
                                type: 'heading',
                                name: 'block-title-2',
                                content: 'this is the header',
                                attributes: {
                                    'text-align': 'center'
                                }
                            },
                            {
                                type: 'paragraph',
                                name: 'block-content-2',
                                content: 'icia soluta odio beatae, sit, possimus enim ad, ex ea asperiores. Dignissimos excepturi tempora ipsa? Nobis.',
                                attributes: {
                                    'text-align': 'center'
                                }
                            }
                        ]
                    },
                    {
                        type: 'block-container',
                        name: 'content-block-3',
                        content: '',
                        attributes: {
                            'width': '100%',
                            'height': '100%'
                        },
                        children: [
                            {
                                type: 'heading',
                                name: 'block-title-3',
                                content: 'this is the header',
                                attributes: {
                                    'text-align': 'center'
                                }
                            },
                            {
                                type: 'paragraph',
                                name: 'block-content-3',
                                content: 'icia soluta odio beatae, sit, possimus enim ad, ex ea asperiores. Dignissimos excepturi tempora ipsa? Nobis.',
                                attributes: {
                                    'text-align': 'center'
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        type: 'sectionBreak',
        variants: [
            {
                name: 'SectionBreak1',
                elements: [
                    {
                        type: 'block-container',
                        name: 'section-break-item',
                        content: '',
                        class: 'section-break-item',
                        attributes: {
                            'width': '100%',
                            'height': '100%',
                            'border-radius': '50%',
                            'background-color': '#D9D9D9',
                            'display': 'flex',
                            'justify-content': 'center',
                            'align-items': 'center'
                        },
                        children: [
                            {
                                type: 'heading',
                                name: 'section-number',
                                content: '#1',
                                attributes: {
                                    'text-align': 'center'
                                }
                            }
                        ]
                    },
                    {
                        type: 'heading',
                        name: 'section-title',
                        content: 'Section Title #1',
                        attributes: {
                            'text-align': 'center'
                        }
                    }
                ]
            },
            {
                name: 'SectionBreak2',
                elements: [
                    {
                        type: 'block-container',
                        name: 'section-break-item',
                        content: '',
                        class: 'section-break-item',
                        attributes: {
                            'width': '100%',
                            'height': '100%',
                            'background-color': '#D9D9D9',
                            'display': 'flex',
                            'justify-content': 'center',
                            'align-items': 'center'
                        },
                        children: [
                            {
                                type: 'heading',
                                name: 'section-number',
                                content: '#1',
                                attributes: {
                                    'text-align': 'center'
                                }
                            }
                        ]
                    },
                    {
                        type: 'heading',
                        name: 'section-title',
                        content: 'Section Title #1',
                        attributes: {
                            'text-align': 'center'
                        }
                    }
                ]
            }
        ]
    }
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
        const bulletColorAttr = element.bulletColor ? ` bulletColor="${element.bulletColor}"` : '';
        const bulletTextAttr = element.bulletText ? ` bulletText="${element.bulletText}"` : '';
        const DisplayNoneAttr = element.setDisplayNone && element.setDisplayNone === true ? 'true' : 'false';
        switch (element.type) {
            case 'image':
                return `<img src="${element.content}" style="${styleString}" alt="Mountain Landscape" setDisplayNone="${DisplayNoneAttr}" />`;
            case 'heading':
                return `<h1 style="${styleString}">${element.content}</h1>`;
            case 'paragraph':
                return `<p style="${styleString}">${element.content}</p>`;
            case 'li':
                const liChildrenHTML = element.children?.map(child => renderElement(child)).join('\n') || '';
                return `<li${bulletColorAttr}${bulletTextAttr} style="${styleString}">${liChildrenHTML}</li>`;
            case 'block-container':
                const childrenHTML = element.children?.map(child => renderElement(child)).join('\n') || '';
                return `<block-container${classAttr} style="${styleString}">${childrenHTML}</block-container>`;
            case 'svg-node':
                const srcAttr = element.src ? ` src="${element.src}"` : '';
                return `<svg-node${srcAttr} style="${styleString}"></svg-node>`;
            case 'shape':
                return `<shape style="${styleString}"></shape>`;
            case 'icon':
                const iconNameAttr = attributes.iconName ? ` iconName="${attributes.iconName}"` : '';
                const iconSizeAttr = attributes.iconSize ? ` iconSize="${attributes.iconSize}"` : '';
                const iconColorAttr = attributes.iconColor ? ` iconColor="${attributes.iconColor}"` : '';
                return `<icon ${iconNameAttr} ${iconSizeAttr} ${iconColorAttr}></icon>`;
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
            return `<div class="slide-body" n="${slideNumber}"><headertext-layout variant="${Updatedvariant}" slideNumber="${slideNumber}">${elementsHTML}</headertext-layout></div>`;
        case 'textCardLayout':
            console.log(`elementsHTML of ${Updatedvariant}`, elementsHTML)
            return `<div class="slide-body" n="${slideNumber}"><text-card-layout variant="${Updatedvariant}" slideNumber="${slideNumber}">${elementsHTML}</text-card-layout></div>`;
        case 'imageFormat':
            return `<div class="slide-body" n="${slideNumber}"><image-format variant="${Updatedvariant}" slideNumber="${slideNumber}">${elementsHTML}</image-format></div>`;
        case 'bulletList':
            console.log(`elementsHTML of ${Updatedvariant}`, elementsHTML)
            return `<div class="slide-body" n="${slideNumber}"><bullet-list variant="${Updatedvariant}" slideNumber="${slideNumber}">${elementsHTML}</bullet-list></div>`;
        case 'infoCollection':
            return `<div class="slide-body" n="${slideNumber}"><info-collection variant="${Updatedvariant}" slideNumber="${slideNumber}">${elementsHTML}</info-collection></div>`;
        case 'sectionBreak':
            return `<div class="slide-body" n="${slideNumber}"><section-break variant="${Updatedvariant}" slideNumber="${slideNumber}">${elementsHTML}</section-break></div>`;
        default:
            return '';
    }
};