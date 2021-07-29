export interface IProduct {
    count: number;
    description: string;
    id: string;
    price: number;
    title: string;
}

export const PRODUCT_BY_ID_MAP = new Map<string, IProduct>([
    [
        '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
        {
            count: 4,
            description: 'Nice Product 1',
            id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
            price: 2.4,
            title: 'Nice Product 1',
        },
    ],
    [
        '7567ec4b-b10c-48c5-9345-fc73c48a80a0',
        {
            count: 6,
            description: 'Nice Product 2',
            id: '7567ec4b-b10c-48c5-9345-fc73c48a80a0',
            price: 10,
            title: 'Nice Product 2',
        },
    ],
    [
        '7567ec4b-b10c-48c5-9345-fc73c48a80a2',
        {
            count: 7,
            description: 'Nice Product 3',
            id: '7567ec4b-b10c-48c5-9345-fc73c48a80a2',
            price: 23,
            title: 'Nice Product 3',
        },
    ],
    [
        '7567ec4b-b10c-48c5-9345-fc73c48a80a1',
        {
            count: 12,
            description: 'Nice Product 4',
            id: '7567ec4b-b10c-48c5-9345-fc73c48a80a1',
            price: 15,
            title: 'Nice Product 4',
        },
    ],

    [
        '7567ec4b-b10c-48c5-9345-fc73c48a80a3',
        {
            count: 7,
            description: 'Nice Product 5',
            id: '7567ec4b-b10c-48c5-9345-fc73c48a80a3',
            price: 23,
            title: 'Nice Product 5',
        },
    ],
    [
        '7567ec4b-b10c-48c5-9345-fc73348a80a1',
        {
            count: 8,
            description: 'Nice Product 6',
            id: '7567ec4b-b10c-48c5-9345-fc73348a80a1',
            price: 15,
            title: 'Nice Product 6',
        },
    ],
    [
        '7567ec4b-b10c-48c5-9445-fc73c48a80a2',
        {
            count: 2,
            description: 'Nice Product 7',
            id: '7567ec4b-b10c-48c5-9445-fc73c48a80a2',
            price: 23,
            title: 'Nice Product 7',
        },
    ],
    [
        '7567ec4b-b10c-45c5-9345-fc73c48a80a1',
        {
            count: 3,
            description: 'Nice Product 8',
            id: '7567ec4b-b10c-45c5-9345-fc73c48a80a1',
            price: 15,
            title: 'Nice Product 8',
        },
    ],
]);
