export interface IProduct {
    count: number;
    description: string;
    id: string;
    price: number;
    title: string;
}

export const PRODUCT_BY_ID_MAP = new Map<string, IProduct>([
    [
        '9a14812c-07e1-463e-9fa1-1a5179f48e61',
        {
            count: 4,
            description: 'Nice Product 1',
            id: '9a14812c-07e1-463e-9fa1-1a5179f48e61',
            price: 2,
            title: 'Nice Product 1',
        },
    ],
    [
        '164032bb-6512-4d5b-aae8-313fc365f012',
        {
            count: 6,
            description: 'Nice Product 2',
            id: '164032bb-6512-4d5b-aae8-313fc365f012',
            price: 10,
            title: 'Nice Product 2',
        },
    ],
    [
        'b3595014-634c-4b47-8250-cce3867d4919',
        {
            count: 7,
            description: 'Nice Product 3',
            id: 'b3595014-634c-4b47-8250-cce3867d4919',
            price: 23,
            title: 'Nice Product 3',
        },
    ],
    [
        '504e5779-c1bc-4498-a792-3b12839b4a7d',
        {
            count: 12,
            description: 'Nice Product 4',
            id: '504e5779-c1bc-4498-a792-3b12839b4a7d',
            price: 15,
            title: 'Nice Product 4',
        },
    ],

    [
        'e7a1919b-0bb8-4511-980b-553a332be219',
        {
            count: 7,
            description: 'Nice Product 5',
            id: 'e7a1919b-0bb8-4511-980b-553a332be219',
            price: 23,
            title: 'Nice Product 5',
        },
    ],
    [
        '00e95255-4243-426c-93e7-b9504a8bff89',
        {
            count: 8,
            description: 'Nice Product 6',
            id: '00e95255-4243-426c-93e7-b9504a8bff89',
            price: 15,
            title: 'Nice Product 6',
        },
    ],
    [
        'c2f464aa-a291-435d-b465-f35c5466f19c',
        {
            count: 2,
            description: 'Nice Product 7',
            id: 'c2f464aa-a291-435d-b465-f35c5466f19c',
            price: 23,
            title: 'Nice Product 7',
        },
    ],
    [
        '00345b0c-d0fb-4076-836b-b67c715f3a4e',
        {
            count: 3,
            description: 'Nice Product 8',
            id: '00345b0c-d0fb-4076-836b-b67c715f3a4e',
            price: 15,
            title: 'Nice Product 8',
        },
    ],
]);
