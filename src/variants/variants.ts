export const TitleSlideVariants = [
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
                    textAlign: 'center',
                    fontWeight: 'bold',
                    alignSelf: 'center'
                }
            },
            {
                type: 'paragraph',
                name: 'credit line',
                content: 'credit line',
                attributes: {
                    marginLeft: '10%',
                    alignSelf: 'center',
                    textAlign: 'left'
                }
            },
            {
                type: 'paragraph',
                name: 'date',
                content: 'date',
                attributes: {
                    marginRight: '10%',
                    alignSelf: 'center',
                    textAlign: 'right'
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
                    textAlign: 'center',
                    fontWeight: 'bold',
                    alignSelf: 'center'
                }
            },
            {
                type: 'paragraph',
                name: 'credit line',
                content: 'credit line',
                attributes: {
                    marginLeft: '5%',
                    alignSelf: 'center',
                    textAlign: 'left'
                }
            },
            {
                type: 'paragraph',
                name: 'date',
                content: 'date',
                attributes: {
                    marginRight: '5%',
                    alignSelf: 'center',
                    textAlign: 'right'
                }
            },
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
                    textAlign: 'center',
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    justifySelf: 'center'

                }

            },
            {
                type: 'paragraph',
                name: 'credit line',
                content: 'credit line',
                attributes: {
                    marginLeft: '10%',
                    alignSelf: 'center',
                    textAlign: 'right'
                }
            },
            {
                type: 'paragraph',
                name: 'date',
                content: 'date',
                attributes: {
                    marginLeft: '10%',
                    alignSelf: 'center',
                    textAlign: 'left'
                }
            },
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
                    color: 'blue',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    justifySelf: 'center'

                }

            },
            {
                type: 'paragraph',
                name: 'credit line',
                content: 'credit line',
                attributes: {
                    marginLeft: '10%',
                    alignSelf: 'center',
                    textAlign: 'right'
                }
            },
            {
                type: 'paragraph',
                name: 'date',
                content: 'date',
                attributes: {
                    marginLeft: '10%',
                    alignSelf: 'center',
                    textAlign: 'left'
                }
            },
        ]
    },
]


export const renderHTML = (Updatedvariant: string) => {
    const variant = TitleSlideVariants.find(v => v.name === Updatedvariant)
    if (!variant) return ''

    const html = variant?.elements?.map(element => {
        if (element.type === 'image') {
            return `<img src="${element.content}" alt="${element.content}" />`
        }
        if (element.type === 'heading') {
            const styles = [];
            if (element.attributes?.color) styles.push(`color: ${element.attributes.color}`);
            if (element.attributes?.textAlign) styles.push(`text-align: ${element.attributes.textAlign}`);
            if (element.attributes?.fontWeight) styles.push(`font-weight: ${element.attributes.fontWeight}`);
            if (element.attributes?.alignSelf) styles.push(`align-self: ${element.attributes.alignSelf}`);
            if (element.attributes?.justifySelf) styles.push(`justify-self: ${element.attributes.justifySelf}`);

            return `<h1 style="${styles.join('; ')}">${element.content}</h1>`
        }
        if (element.type === 'paragraph' && element.name === 'credit line') {
            const styles = [];
            if (element.attributes?.marginLeft) styles.push(`margin-left: ${element.attributes.marginLeft}`);
            if (element.attributes?.alignSelf) styles.push(`align-self: ${element.attributes.alignSelf}`);
            if (element.attributes?.textAlign) styles.push(`text-align: ${element.attributes.textAlign}`);
            if (element.attributes?.color) styles.push(`color: ${element.attributes.color}`);

            return `<p style="${styles.join('; ')}">${element.content}</p>`
        }
        if (element.type === 'paragraph' && element.name === 'date') {
            const styles = [];
            if (element.attributes?.marginRight) styles.push(`margin-right: ${element.attributes.marginRight}`);
            if (element.attributes?.marginLeft) styles.push(`margin-left: ${element.attributes.marginLeft}`);
            if (element.attributes?.alignSelf) styles.push(`align-self: ${element.attributes.alignSelf}`);
            if (element.attributes?.textAlign) styles.push(`text-align: ${element.attributes.textAlign}`);
            if (element.attributes?.color) styles.push(`color: ${element.attributes.color}`);

            return `<p style="${styles.join('; ')}">${element.content}</p>`
        }
    }).join('')
    console.log(`<div class="slide-body" n="1">
        <title-slide variant="${Updatedvariant}">${html}</title-slide>
    </div>`)
    return `
   <div class="slide-body" n="1">
    <title-slide variant="${Updatedvariant}">${html}</title-slide>
    </div>
    `
}