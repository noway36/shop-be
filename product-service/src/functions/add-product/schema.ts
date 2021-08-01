export default {
    type: 'object',
    properties: {
        product: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                price: { type: 'number' },
                count: { type: 'number' },
            },
            required: ['title', 'description', 'price', 'count'],
        },
    },
    required: ['product'],
} as const;
