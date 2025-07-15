export const allStyleAttributes = {
    color: {
        default: null,
        parseHTML: (element: any) => element.style.color || null,
    },
    textAlign: {
        default: 'center',
        parseHTML: (element: any) => element.style.textAlign || '',
    },
    fontWeight: {
        default: 'bold',
        parseHTML: (element: any) => element.style.fontWeight || '',
    },
    alignSelf: {
        default: 'center',
        parseHTML: (element: any) => element.style.alignSelf || '',
    },
    justifySelf: {
        default: 'center',
        parseHTML: (element: any) => element.style.justifySelf || '',
    },
    marginLeft: {
        default: '0',
        parseHTML: (element: any) => element.style.marginLeft || '0',
    },
    marginRight: {
        default: '0',
        parseHTML: (element: any) => element.style.marginRight || '0',
    },
    backgroundColor: {
        default: '',
        parseHTML: (element: any) => element.style.backgroundColor || '',
    },
    width: {
        default: '',
        parseHTML: (element: any) => element.style.width || '',
    },
    height: {
        default: '',
        parseHTML: (element: any) => element.style.height || '',
    },
    borderWidth: {
        default: '',
        parseHTML: (element: any) => element.style.borderWidth || '',
    },
    borderStyle: {
        default: '',
        parseHTML: (element: any) => element.style.borderStyle || '',
    },
    borderColor: {
        default: '',
        parseHTML: (element: any) => element.style.borderColor || '',
    },
    borderRadius: {
        default: '',
        parseHTML: (element: any) => element.style.borderRadius || '',
    },
    marginTop: {
        default: '',
        parseHTML: (element: any) => element.style.marginTop || '',
    },
    marginBottom: {
        default: '',
        parseHTML: (element: any) => element.style.marginBottom || '',
    },
    display: {
        default: 'block',
        parseHTML: (element: any) => element.style.display || 'block',
    },
    position: {
        default: '',
        parseHTML: (element: any) => element.style.position || '',
    },
}; 